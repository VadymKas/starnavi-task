import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { getFilms, getHero, getStarships } from '../../services/api/getData';
import { edgesType, nodesType } from './types';

const initialNodes: nodesType[] = [];
const initialEdges: edgesType[] = [];

const HeroCard: React.FC = () => {
  const { id } = useParams();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    async function getData() {
      if (!!id) {
        const { data: heroData } = await getHero(id);
        const { data: filmsData } = await getFilms(id);
        const { data: starshipData } = await getStarships(id);

        const films = filmsData.results;
        const starships = starshipData.results;

        const filmNodes = films.map(
          (film: { id: number; title: string }, idx: number) => ({
            id: `${film.id}`,
            data: { label: film.title },
            position: {
              x: Math.random() + idx * 200,
              y: Math.random() + 200,
            },
          }),
        );

        const filmEdges = films.map((film: { id: number; title: string }) => ({
          id: `${id}-${film.id}`,
          source: id,
          target: `${film.id}`,
          label: 'films',
          type: 'straight',
        }));

        const shipNodes = starships.map(
          (ship: { id: number; name: string }, idx: number) => ({
            id: `${ship.id}`,
            data: { label: ship.name },
            position: {
              x: Math.random() + idx * 200,
              y: Math.random() + 400,
            },
          }),
        );

        const shipEdges = starships
          .map((ship: { id: number; name: string; films: string[] }) => {
            return ship.films.map((idx) => ({
              id: `${idx}-${ship.id}`,
              source: `${idx}`,
              target: `${ship.id}`,
              label: 'starships',
              type: 'straight',
            }));
          })
          .flat();

        setNodes([
          {
            id: `${heroData.id}`,
            data: { label: heroData.name },
            position: { x: (window.screen.width - 150) / 2, y: 0 },
            style: {fontSize: '20px', fontWeight: '600'}
          },
          ...filmNodes,
          ...shipNodes,
        ]);
        setEdges([...filmEdges, ...shipEdges]);
      }
    }

    getData();
  }, [id, setEdges, setNodes]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: 'calc(100vw - 20px)', height: 'calc(100vh - 20px)', margin: '20px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </div>
  );
};

export default HeroCard;

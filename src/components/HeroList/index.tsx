import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

import { HeroListElementType } from '../HeroListElement/types';
import styles from '../../styles/HeroList.module.scss';

import { getHeroes } from '../../services/api/getData';
import HeroListElement from '../HeroListElement';

const HeroList: React.FC = () => {
  const [list, setList] = useState<HeroListElementType[]>([]);
  const [page, setPage] = useState({ total: 0, current: 1 });

  useEffect(() => {
    getHeroes(page.current).then(({ data }) => {
      setList(data.results);
      if (!page.total) {
        setPage((prev) => ({ ...prev, total: Math.ceil(data.count / 10) }));
      }
    });
  }, [page]);

  const heroList = list.map(({ name, id }: HeroListElementType) => {
    return (
      <Link
        to={`/hero/${id}`}
        key={id}>
        <HeroListElement
          name={name}
          id={id}
        />
      </Link>
    );
  });

  return (
    <section className={styles.list}>
      <ul className={styles.data}>{heroList}</ul>
      <ReactPaginate
        className={styles.pagination}
        pageLinkClassName={styles.pagination__item}
        previousLinkClassName={styles.pagination__item_prev}
        nextLinkClassName={styles.pagination__item_next}
        activeClassName={styles.pagination__item_active}
        nextLabel='>'
        previousLabel='<'
        breakLabel='...'
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={(e) =>
          setPage((prev) => ({ ...prev, current: e.selected + 1 }))
        }
        pageCount={page.total}
        renderOnZeroPageCount={null}
      />
    </section>
  );
};

export default HeroList;

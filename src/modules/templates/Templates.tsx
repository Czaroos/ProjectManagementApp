import React, { useEffect, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router';

import { GetTemplatesPayload } from 'api';

import { useScroll } from 'utils';

import TemplatesProvider, { TemplatesContext } from 'core/templates';

import {
  TemplatesHeader,
  TemplatesSearch,
  TemplateTiles,
  TemplatesProps,
  ConnectedTemplatesProps
} from '.';

import csx from './Templates.scss';

const categories = ['all', 'recommended', 'top', 'recent', 'yours'];

const Templates = ({ activeCategory, history }: TemplatesProps) => {
  const { getTemplates } = useContext(TemplatesContext);

  const [usedFilters, setUsedFilters] = useState<GetTemplatesPayload>({
    page: 1,
    query: '',
    limit: 25
  });

  const handleCategoryChange = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    history.push(e.currentTarget.getAttribute('data-category'));
  }, []);

  const handleSearchSubmit = useCallback((newFilters: any) => {
    setUsedFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
      page: 1
    }));
  }, []);

  useEffect(() => {
    getTemplates(usedFilters);
  }, [usedFilters]);

  useScroll(() => {
    setUsedFilters((prevFilters) => ({
      ...prevFilters,
      page: prevFilters.page + 1
    }));
  }, 1000);

  return (
    <div className={csx.templates}>
      <TemplatesHeader
        activeCategory={activeCategory}
        categories={categories}
        onCategoryClick={handleCategoryChange}
      />
      <TemplatesSearch onSubmit={handleSearchSubmit} />
      <TemplateTiles />
    </div>
  );
};

export default ({
  match: {
    params: { category }
  }
}: ConnectedTemplatesProps) => {
  const history = useHistory();

  useEffect(() => {
    if (!categories.includes(category)) {
      history.push(categories[0]);
    }
  }, []);

  return (
    <TemplatesProvider>
      <Templates activeCategory={category} history={history} />
    </TemplatesProvider>
  );
};
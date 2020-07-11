import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router';

import { Select } from 'ui';

import { Form } from 'utils';

import { Template } from 'core/api';

import { useTemplateDetailsProvider } from 'shared/providers/template-details';

import {
  BASE_CONFIG,
  BASIC_INFO,
  GITHUB_CONNECTION,
  TECH_DETAILS,
  NAME,
  DESCRIPTION,
  GITHUB_LINK,
  TECHNOLOGIES,
  PATTERNS,
  TAGS
} from '.';

interface State {
  loading: boolean;
  config: Form.Config[];
}

type Return = State;

const makeInitState = (id?: string): State => ({
  loading: !!id,
  config: BASE_CONFIG
});

const makeConfig = (template: Template): Form.Config[] => {
  const basicInfoConfig = [...BASE_CONFIG[BASIC_INFO]];
  const githubConnectionConfig = [...BASE_CONFIG[GITHUB_CONNECTION]];
  const techDetailsConfig = [...BASE_CONFIG[TECH_DETAILS]];

  basicInfoConfig[NAME] = { ...basicInfoConfig[NAME], value: template.name };
  basicInfoConfig[DESCRIPTION] = { ...basicInfoConfig[DESCRIPTION], value: template.description };
  githubConnectionConfig[GITHUB_LINK] = {
    ...githubConnectionConfig[GITHUB_LINK],
    value: template.githubLink
  };
  techDetailsConfig[TECHNOLOGIES] = {
    ...techDetailsConfig[TECHNOLOGIES],
    value: Select.makeValues(template.technologies, 'id')
  };
  techDetailsConfig[PATTERNS] = {
    ...techDetailsConfig[PATTERNS],
    value: Select.makeValues(template.patterns, 'id')
  };
  techDetailsConfig[TAGS] = { ...techDetailsConfig[TAGS], value: template.tags };

  return [basicInfoConfig, githubConnectionConfig, techDetailsConfig];
};

export const useTemplateManagementConfig = (): Return => {
  const {
    params: { id }
  } = useRouteMatch<{ id: string }>();

  const [state, setState] = useState(makeInitState(id));

  const { template, getTemplateDetails } = useTemplateDetailsProvider();

  useEffect(() => {
    if (id) {
      getTemplateDetails(id);
    }
  }, [id]);

  useEffect(() => {
    if (template) {
      setState({ loading: false, config: makeConfig(template) });
    }
  }, [template]);

  return state;
};

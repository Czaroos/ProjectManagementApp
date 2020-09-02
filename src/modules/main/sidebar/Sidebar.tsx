import React, {useState} from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { Button } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ProjectsIcon from '@material-ui/icons/Work';
import TemplatesIcon from '@material-ui/icons/LibraryBooks';
import Menu from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close';

import { IMGS_PATH } from 'consts';

import { SidebarProps, SidebarLink } from '.';

import csx from './Sidebar.scss';

const LINK_HEIGHT = 80;

const MARKER_HEIGHT = 30;

const sidebarLinks: SidebarLink[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon />, exact: true },
  { label: 'Templates', path: '/templates', icon: <TemplatesIcon /> },
  { label: 'Projects', path: '/projects', icon: <ProjectsIcon /> }
];

const getActiveLinkIdx = (pathname: string, links: SidebarLink[]) => {
  return links.findIndex(({ path, exact }) => {
    if (exact) {
      return path === pathname;
    }

    return pathname.includes(path);
  });
};

export const Sidebar = ({ basePath }: SidebarProps) => {
  const { pathname } = useLocation();

  const activeLinkIdx = getActiveLinkIdx(pathname.replace(basePath, ''), sidebarLinks);

  const isSidebarOpen = true;

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <aside className={csx.sidebar}>
      <div className={csx.sidebarContent}>
        <figure className={csx.logo} >
          {open
            ? 
            <div className={csx.tile}>
              
                <p><img height="25" src={IMGS_PATH + '/Logo.png'} /></p>
                <p>Jupi.io</p>
                <p><Close onClick={toggleOpen} /></p>
              
            </div>
            : <Menu onClick={toggleOpen} />}
        </figure>

        <div className={csx.links}>
          {sidebarLinks.map(({ path, label, icon, exact }) => (
            <NavLink
              key={label}
              exact={exact}
              activeClassName={csx.active}
              className={csx.link}
              style={{ height: `${LINK_HEIGHT}px` }}
              to={`${basePath}${path}`}
            >
              <Button>

                <div className={csx.tile}>
                    {icon}{open && label}
                </div> 

              </Button>

            </NavLink>
          ))}
          <span
            className={csx.marker}
            style={{
              height: `${MARKER_HEIGHT}px`,
              top: `${(LINK_HEIGHT - MARKER_HEIGHT) / 2}px`,
              transform: `translateY(${LINK_HEIGHT * activeLinkIdx}px)`
            }}
          />
        </div>
      </div>
    </aside>
  );
};

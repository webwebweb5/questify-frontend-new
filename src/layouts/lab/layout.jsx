'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';

import { useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import Loading from 'src/app/loading';
import { varAlpha, stylesMode } from 'src/theme/styles';
import { useGetLaboratoryById } from 'src/actions/laboratory';

import { bulletColor } from 'src/components/nav-section';
import { useSettingsContext } from 'src/components/settings';

import { Main } from './main';
import { layoutClasses } from '../classes';
import { NavVertical } from './nav-vertical';
import { useNavData } from '../config-nav-lab';
import { NavHorizontal } from './nav-horizontal';
import { LayoutSection } from '../core/layout-section';

// ----------------------------------------------------------------------

export function LabLayout({ sx, children, data }) {
  const theme = useTheme();

  const settings = useSettingsContext();

  const navColorVars = useNavColorVars(theme, settings);

  const layoutQuery = 'lg';

  const lgUp = useResponsive('up', 'lg');

  const labNavData = useNavData();

  const navData = data?.nav ?? labNavData;

  const isNavMini = settings.navLayout === 'vertical';

  const isNavHorizontal = settings.navLayout === 'horizontal';

  const isNavVertical = isNavMini || settings.navLayout === 'vertical';

  const params = useParams();

  const { laboratory, laboratoryLoading } = useGetLaboratoryById(params.lid);

  if (laboratoryLoading) return <Loading />;

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */

      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={
        lgUp ? (
          <NavVertical
            laboratoryData={laboratory}
            data={navData}
            isNavMini={isNavMini}
            layoutQuery={layoutQuery}
            cssVars={navColorVars.section}
            onToggleNav={() =>
              settings.onUpdateField(
                'navLayout',
                settings.navLayout === 'vertical' ? 'mini' : 'vertical'
              )
            }
          />
        ) : (
          <NavHorizontal data={navData} layoutQuery={layoutQuery} cssVars={navColorVars.section} />
        )
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        ...navColorVars.layout,
        '--layout-transition-easing': 'linear',
        '--layout-transition-duration': '120ms',
        '--layout-nav-mini-width': '88px',
        '--layout-nav-vertical-width': '300px',
        '--layout-nav-horizontal-height': '64px',
        '--layout-dashboard-content-pt': theme.spacing(3),
        '--layout-dashboard-content-pb': theme.spacing(8),
        '--layout-dashboard-content-px': theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            transition: theme.transitions.create(['padding-left'], {
              easing: 'var(--layout-transition-easing)',
              duration: 'var(--layout-transition-duration)',
            }),
            pl: isNavMini ? 'var(--layout-nav-mini-width)' : 'var(--layout-nav-vertical-width)',
          },
        },
        ...sx,
      }}
    >
      <Main isNavHorizontal={isNavHorizontal}>{children}</Main>
    </LayoutSection>
  );
}

// ----------------------------------------------------------------------

function useNavColorVars(theme, settings) {
  const {
    vars: { palette },
  } = theme;

  return useMemo(() => {
    switch (settings.navColor) {
      case 'integrate':
        return {
          layout: {
            '--layout-nav-bg': palette.background.default,
            '--layout-nav-horizontal-bg': varAlpha(palette.background.defaultChannel, 0.8),
            '--layout-nav-border-color': varAlpha(palette.grey['500Channel'], 0.12),
            '--layout-nav-text-primary-color': palette.text.primary,
            '--layout-nav-text-secondary-color': palette.text.secondary,
            '--layout-nav-text-disabled-color': palette.text.disabled,
            [stylesMode.dark]: {
              '--layout-nav-border-color': varAlpha(palette.grey['500Channel'], 0.08),
              '--layout-nav-horizontal-bg': varAlpha(palette.background.defaultChannel, 0.96),
            },
          },
          section: {},
        };
      case 'apparent':
        return {
          layout: {
            '--layout-nav-bg': palette.grey[900],
            '--layout-nav-horizontal-bg': varAlpha(palette.grey['900Channel'], 0.96),
            '--layout-nav-border-color': 'transparent',
            '--layout-nav-text-primary-color': palette.common.white,
            '--layout-nav-text-secondary-color': palette.grey[500],
            '--layout-nav-text-disabled-color': palette.grey[600],
            [stylesMode.dark]: {
              '--layout-nav-bg': palette.grey[800],
              '--layout-nav-horizontal-bg': varAlpha(palette.grey['800Channel'], 0.8),
            },
          },
          section: {
            // caption
            '--nav-item-caption-color': palette.grey[600],
            // subheader
            '--nav-subheader-color': palette.grey[600],
            '--nav-subheader-hover-color': palette.common.white,
            // item
            '--nav-item-color': palette.grey[500],
            '--nav-item-root-active-color': palette.primary.light,
            '--nav-item-root-open-color': palette.common.white,
            // bullet
            '--nav-bullet-light-color': bulletColor.dark,
            // sub
            ...(settings.navLayout === 'vertical' && {
              '--nav-item-sub-active-color': palette.common.white,
              '--nav-item-sub-open-color': palette.common.white,
            }),
          },
        };
      default:
        throw new Error(`Invalid color: ${settings.navColor}`);
    }
  }, [
    palette.background.default,
    palette.background.defaultChannel,
    palette.common.white,
    palette.grey,
    palette.primary.light,
    palette.text.disabled,
    palette.text.primary,
    palette.text.secondary,
    settings.navColor,
    settings.navLayout,
  ]);
}

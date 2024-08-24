import { useParams } from 'next/navigation';

import { paths } from 'src/routes/paths';

import { useCurrentRole } from 'src/hooks/use-current-role';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  user: icon('ic-user'),
  label: icon('ic-label'),
  course: icon('ic-course'),
};

// ----------------------------------------------------------------------

export const useNavData = () => {
  const params = useParams();
  const role = useCurrentRole();

  const navItems = [
    { title: 'Main', path: paths.lab.main(params.lid), icon: ICONS.course },
    { title: 'Member', path: paths.lab.member(params.lid), icon: ICONS.user },
  ];

  // Conditionally add the 'Grade' item based on the role
  if (role !== 'StdAcc') {
    navItems.push({ title: 'Grade', path: paths.lab.grade(params.lid), icon: ICONS.label });
  }

  navItems.push({
    title: 'Settings',
    path: paths.lab.settings(params.lid),
    icon: <Iconify icon="solar:settings-bold-duotone" />,
  });

  return [
    {
      subheader: 'Questify',
      items: navItems,
    },
  ];
};

import { useParams } from 'next/navigation';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

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

  return [
    {
      subheader: 'Questify',
      items: [
        { title: 'Main', path: paths.lab.main(params.id), icon: ICONS.course },
        { title: 'Member', path: paths.lab.member(params.id), icon: ICONS.user },
        { title: 'Grade', path: paths.lab.grade(params.id), icon: ICONS.label },
      ],
    },
  ];
};

import { useCreateStore, useControls, folder } from 'leva';

export const useSpotifyConfig = () => {
  const store = useCreateStore();
  const config = useControls(
    'Spotwitchy Editor',
    {
      styles: folder({
        gradientColor: {
          value: '#000200',
          hint: 'Change Gradient Color',
          label: 'Gradient Color',
        },
        songStatusColor: {
          value: '#FFFFFF',
          hint: 'Change Status Color',
          label: 'Status Color',
        },
        songTitleColor: {
          value: '#FFFFFF',
          hint: 'Change Song Title Color',
          label: 'Song Title Color',
        },
        artistColor: {
          value: '#E5E5E5',
          hint: 'Change Artist Name Color',
          label: 'Artist Name Color',
        },
        percentColor: {
          value: '#E5E5E5',
          hint: 'Change Percent Color',
          label: 'Percent Color',
        },
        showPercent: {
          value: true,
          hint: 'Show/Hide Percent',
          label: 'Percent Visibility',
        },
      }),
    },
    [store]
  );

  return config;
};

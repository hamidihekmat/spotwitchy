import { useCreateStore, useControls, folder } from 'leva';
import { useEffect } from 'react';

type WidgetConfig = {
  artistColor: string;
  gradientColor: string;
  showPercent: string;
  songStatusColor: string;
  percentColor: string;
  songTitleColor: string;
};

const DEFAULT_WIDGET_CONFIG: WidgetConfig = {
  gradientColor: '#000200',
  songStatusColor: '#FFFFFF',
  artistColor: '#FFFFFF',
  showPercent: 'true',
  songTitleColor: '#FFFFFF',
  percentColor: '#FFFFFF',
};

export const useSpotifyConfig = () => {
  const {
    gradientColor,
    songStatusColor,
    songTitleColor,
    showPercent,
    artistColor,
    percentColor,
  } = DEFAULT_WIDGET_CONFIG;

  const store = useCreateStore();
  const [config, set] = useControls(
    'Editor',
    () => ({
      styles: folder({
        gradientColor: {
          value: gradientColor,
          hint: 'Change Gradient Color',
          label: 'Gradient Color',
        },
        songStatusColor: {
          value: songStatusColor,
          hint: 'Change Status Color',
          label: 'Status Color',
        },
        songTitleColor: {
          value: songTitleColor,
          hint: 'Change Song Title Color',
          label: 'Song Title Color',
        },
        artistColor: {
          value: artistColor,
          hint: 'Change Artist Name Color',
          label: 'Artist Name Color',
        },

        percentColor: {
          value: percentColor,
          hint: 'Change Percent Color',
          label: 'Percent Color',
        },
        showPercent: {
          value: showPercent === 'true' ? true : false,
          hint: 'Show/Hide Percent',
          label: 'Percent Visibility',
        },
      }),
    }),
    [store]
  );

  useEffect(() => {
    const searchParams = new URL(window.location.href).searchParams;
    if (searchParams.toString()) {
      const queryConfig = Object.fromEntries(
        new URLSearchParams(searchParams)
      ) as WidgetConfig;

      set({
        gradientColor: queryConfig.gradientColor,
        songStatusColor: queryConfig.songStatusColor,
        songTitleColor: queryConfig.songTitleColor,
        artistColor: queryConfig.artistColor,
        showPercent: queryConfig.showPercent === 'true' ? true : false,
        percentColor: queryConfig.percentColor,
      });
    }
  }, []); // eslint-disable-line

  return config;
};

export type ViewportSize = 'COMPACT' | 'MEDIUM' | 'EXPANDED' | 'LARGE' | 'EXTRA';

export const viewportSizes: { [K in ViewportSize]: string } = {
    COMPACT: 'only screen and (max-width: 600px)',
    MEDIUM: 'only screen and (min-width: 601px) and (max-width: 840px)',
    EXPANDED: 'only screen and (min-width: 841px) and (max-width: 1200px)',
    LARGE: 'only screen and (min-width: 1201px) and (max-width: 1600px)',
    EXTRA: 'only screen and (min-width: 1601px)',
};

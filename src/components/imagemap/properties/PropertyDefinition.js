import GeneralProperty from './GeneralProperty';
import ImageFilterProperty from './ImageFilterProperty';
import ImageProperty from './ImageProperty';
import LinkProperty from './LinkProperty';
import MapProperty from './MapProperty';
import MarkerProperty from './MarkerProperty';
import ShadowProperty from './ShadowProperty';
import StyleProperty from './StyleProperty';
import TextProperty from './TextProperty';
import TooltipProperty from './TooltipProperty';
import TriggerProperty from './TriggerProperty';
import UserProperty from './UserProperty';

export default {
  map: {
    map: {
      title: 'Basic',
      component: MapProperty,
    },
  },
  group: {
    general: {
      title: 'General',
      component: GeneralProperty,
    },
    shadow: {
      title: 'Shadow',
      component: ShadowProperty,
    },
  },
  'i-text': {
    general: {
      title: 'General',
      component: GeneralProperty,
    },
    marker: {
      title: 'Marker',
      component: MarkerProperty,
    },
    link: {
      title: 'Link',
      component: LinkProperty,
    },
    tooltip: {
      title: 'Tooltip',
      component: TooltipProperty,
    },
    style: {
      title: 'Style',
      component: StyleProperty,
    },
    shadow: {
      title: 'Shadow',
      component: ShadowProperty,
    },
    trigger: {
      title: 'Trigger',
      component: TriggerProperty,
    },
    userProperty: {
      title: 'User Property',
      component: UserProperty,
    },
  },
  textbox: {
    general: {
      title: 'General',
      component: GeneralProperty,
    },
    text: {
      title: 'Text',
      component: TextProperty,
    },
    style: {
      title: 'Style',
      component: StyleProperty,
    },
    shadow: {
      title: 'Shadow',
      component: ShadowProperty,
    },
  },
  image: {
    general: {
      title: 'General',
      component: GeneralProperty,
    },
    image: {
      title: 'Image',
      component: ImageProperty,
    },
    filter: {
      title: 'Filter',
      component: ImageFilterProperty,
    },
  },
};

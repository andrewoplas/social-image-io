import MarkerProperty from './MarkerProperty';
import GeneralProperty from './GeneralProperty';
import StyleProperty from './StyleProperty';
import TooltipProperty from './TooltipProperty';
import ImageProperty from './ImageProperty';
import TextProperty from './TextProperty';
import MapProperty from './MapProperty';
import LinkProperty from './LinkProperty';
import VideoProperty from './VideoProperty';
import ElementProperty from './ElementProperty';
import IframeProperty from './IframeProperty';
import AnimationProperty from './AnimationProperty';
import ShadowProperty from './ShadowProperty';
import UserProperty from './UserProperty';
import TriggerProperty from './TriggerProperty';
import ImageFilterProperty from './ImageFilterProperty';
import ChartProperty from './ChartProperty';

export default {
  map: {
    map: {
      title: 'Canvas',
      component: MapProperty,
    },
    image: {
      title: 'Image',
      component: ImageProperty,
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
    animation: {
      title: 'Animation',
      component: AnimationProperty,
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

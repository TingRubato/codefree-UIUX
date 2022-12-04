import { EventAction, IEvent } from '@mtbird/shared';
import keys from 'lodash/keys';
import { generateFunction } from '../utils';

export const EVENT_ACTION = [
  {
    label: '点击',
    value: 'click'
  },
  {
    label: '双击',
    value: 'dbClick'
  },
  {
    label: '初始化',
    value: 'init'
  },
  {
    label: '鼠标浮动',
    value: 'mouseOver'
  }
];

// | 'link-blank' | 'submit' | 'clear' | 'open-modal' | 'close-modal' | 'inline-code' | 'change-variable'
export const EVENT_TYPE = [
  {
    label: '跳转页面',
    value: 'link-page'
  },
  {
    label: '跳转链接',
    value: 'link'
  },
  {
    label: '打开链接',
    value: 'link-blank'
  },
  {
    label: '提交表单',
    value: 'submit'
  },
  {
    label: '清空表单',
    value: 'clear'
  },
  {
    label: '打开弹窗',
    value: 'open-modal'
  },
  {
    label: '关闭弹窗',
    value: 'close-modal'
  },
  {
    label: '执行代码',
    value: 'inline-code'
  }
];

export const EventActionConstants = { click: 'click', hover: 'hover', blur: 'blur', dbclick: 'dbclick', scroll: 'scroll' };
export const EventActionEventHandler = { click: 'onClick', hover: 'onHover', blur: 'onBlur', dbclick: 'onDbClick', scroll: 'onScroll' };

export const EventType = {
  link: 'link',
  linkBlank: 'link-blank',
  submit: 'submit',
  clear: 'clear',
  openModal: 'open-modal',
  closeModal: 'close-modal',
  inlineCode: 'inline-code',
  changeVariable: 'change-variable'
};

export const generateEventHandlers = (events: Record<EventAction, IEvent>, context: any) => {
  const handers = {};

  const handlerGenerator = (event: IEvent) => {
    return () => {
      switch (event.type) {
        case EventType.changeVariable:
          return context.changeVariable(event.keyPath, event.value);
        case EventType.openModal:
          return context.changeVariable(`$modals.${event.modalId}`, true);
        case EventType.closeModal:
          return context.changeVariable(`$modals.${event.modalId}`, false);
        case EventType.linkBlank:
          return window.open(event.src);
        case EventType.linkBlank:
          return (location.href = event.src);
        case EventType.inlineCode:
          return generateFunction(event.inlineCode as string);
      }
    };
  };

  keys(events).forEach((event: IEvent) => {
    handers[EventActionEventHandler[event]] = handlerGenerator(events[event]);
  });

  return handers;
};
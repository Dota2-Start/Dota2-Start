import { createRouteLoader, WrapRouteComponent, RouteErrorComponent } from '@ice/runtime';
import type { CreateRoutes } from '@ice/runtime';
const createRoutes: CreateRoutes = ({
  requestContext,
  renderMode,
}) => ([
  {
    path: '',
    async lazy() {
      const componentModule = await import(/* webpackChunkName: "p_layout" */ '@/pages/layout');
      return {
        ...componentModule,
        Component: () => WrapRouteComponent({
          routeId: 'layout',
          isLayout: true,
          routeExports: componentModule,
        }),
        loader: createRouteLoader({
          routeId: 'layout',
          requestContext,
          renderMode,
          module: componentModule,
        }),
      };
    },
    errorElement: <RouteErrorComponent />,
    componentName: 'layout',
    index: undefined,
    id: 'layout',
    exact: true,
    exports: ["default"],
    layout: true,
    children: [{
      path: 'StateCard',
      async lazy() {
      const componentModule = await import(/* webpackChunkName: "p_index-statecard" */ '@/pages/index/StateCard');
      return {
        ...componentModule,
        Component: () => WrapRouteComponent({
          routeId: 'StateCard',
          isLayout: false,
          routeExports: componentModule,
        }),
        loader: createRouteLoader({
          routeId: 'StateCard',
          requestContext,
          renderMode,
          module: componentModule,
        }),
      };
    },
      errorElement: <RouteErrorComponent />,
      componentName: 'index-statecard',
      index: undefined,
      id: 'StateCard',
      exact: true,
      exports: ["StateCard"],
    },{
      path: 'option/filedata',
      async lazy() {
      const componentModule = await import(/* webpackChunkName: "p_option-filedata" */ '@/pages/option/filedata');
      return {
        ...componentModule,
        Component: () => WrapRouteComponent({
          routeId: 'option/filedata',
          isLayout: false,
          routeExports: componentModule,
        }),
        loader: createRouteLoader({
          routeId: 'option/filedata',
          requestContext,
          renderMode,
          module: componentModule,
        }),
      };
    },
      errorElement: <RouteErrorComponent />,
      componentName: 'option-filedata',
      index: undefined,
      id: 'option/filedata',
      exact: true,
      exports: ["fileData"],
    },{
      path: 'PlayDota',
      async lazy() {
      const componentModule = await import(/* webpackChunkName: "p_index-playdota" */ '@/pages/index/PlayDota');
      return {
        ...componentModule,
        Component: () => WrapRouteComponent({
          routeId: 'PlayDota',
          isLayout: false,
          routeExports: componentModule,
        }),
        loader: createRouteLoader({
          routeId: 'PlayDota',
          requestContext,
          renderMode,
          module: componentModule,
        }),
      };
    },
      errorElement: <RouteErrorComponent />,
      componentName: 'index-playdota',
      index: undefined,
      id: 'PlayDota',
      exact: true,
      exports: ["PlayDota"],
    },{
      path: 'option/FileRew',
      async lazy() {
      const componentModule = await import(/* webpackChunkName: "p_option-filerew" */ '@/pages/option/FileRew');
      return {
        ...componentModule,
        Component: () => WrapRouteComponent({
          routeId: 'option/FileRew',
          isLayout: false,
          routeExports: componentModule,
        }),
        loader: createRouteLoader({
          routeId: 'option/FileRew',
          requestContext,
          renderMode,
          module: componentModule,
        }),
      };
    },
      errorElement: <RouteErrorComponent />,
      componentName: 'option-filerew',
      index: undefined,
      id: 'option/FileRew',
      exact: true,
      exports: ["default"],
    },{
      path: 'about/updates',
      async lazy() {
      const componentModule = await import(/* webpackChunkName: "p_about-updates" */ '@/pages/about/updates');
      return {
        ...componentModule,
        Component: () => WrapRouteComponent({
          routeId: 'about/updates',
          isLayout: false,
          routeExports: componentModule,
        }),
        loader: createRouteLoader({
          routeId: 'about/updates',
          requestContext,
          renderMode,
          module: componentModule,
        }),
      };
    },
      errorElement: <RouteErrorComponent />,
      componentName: 'about-updates',
      index: undefined,
      id: 'about/updates',
      exact: true,
      exports: ["default"],
    },{
      path: 'option/opdata',
      async lazy() {
      const componentModule = await import(/* webpackChunkName: "p_option-opdata" */ '@/pages/option/opdata');
      return {
        ...componentModule,
        Component: () => WrapRouteComponent({
          routeId: 'option/opdata',
          isLayout: false,
          routeExports: componentModule,
        }),
        loader: createRouteLoader({
          routeId: 'option/opdata',
          requestContext,
          renderMode,
          module: componentModule,
        }),
      };
    },
      errorElement: <RouteErrorComponent />,
      componentName: 'option-opdata',
      index: undefined,
      id: 'option/opdata',
      exact: true,
      exports: ["DotaSource"],
    },{
      path: 'about/author',
      async lazy() {
      const componentModule = await import(/* webpackChunkName: "p_about-author" */ '@/pages/about/author');
      return {
        ...componentModule,
        Component: () => WrapRouteComponent({
          routeId: 'about/author',
          isLayout: false,
          routeExports: componentModule,
        }),
        loader: createRouteLoader({
          routeId: 'about/author',
          requestContext,
          renderMode,
          module: componentModule,
        }),
      };
    },
      errorElement: <RouteErrorComponent />,
      componentName: 'about-author',
      index: undefined,
      id: 'about/author',
      exact: true,
      exports: ["AuthorT"],
    },{
      path: 'newBox',
      async lazy() {
      const componentModule = await import(/* webpackChunkName: "p_index-newbox" */ '@/pages/index/newBox');
      return {
        ...componentModule,
        Component: () => WrapRouteComponent({
          routeId: 'newBox',
          isLayout: false,
          routeExports: componentModule,
        }),
        loader: createRouteLoader({
          routeId: 'newBox',
          requestContext,
          renderMode,
          module: componentModule,
        }),
      };
    },
      errorElement: <RouteErrorComponent />,
      componentName: 'index-newbox',
      index: undefined,
      id: 'newBox',
      exact: true,
      exports: ["default"],
    },{
      path: 'option',
      async lazy() {
      const componentModule = await import(/* webpackChunkName: "p_option-index" */ '@/pages/option/index');
      return {
        ...componentModule,
        Component: () => WrapRouteComponent({
          routeId: 'option',
          isLayout: false,
          routeExports: componentModule,
        }),
        loader: createRouteLoader({
          routeId: 'option',
          requestContext,
          renderMode,
          module: componentModule,
        }),
      };
    },
      errorElement: <RouteErrorComponent />,
      componentName: 'option-index',
      index: true,
      id: 'option',
      exact: true,
      exports: ["default"],
    },{
      path: 'option/start',
      async lazy() {
      const componentModule = await import(/* webpackChunkName: "p_option-start" */ '@/pages/option/start');
      return {
        ...componentModule,
        Component: () => WrapRouteComponent({
          routeId: 'option/start',
          isLayout: false,
          routeExports: componentModule,
        }),
        loader: createRouteLoader({
          routeId: 'option/start',
          requestContext,
          renderMode,
          module: componentModule,
        }),
      };
    },
      errorElement: <RouteErrorComponent />,
      componentName: 'option-start',
      index: undefined,
      id: 'option/start',
      exact: true,
      exports: ["default"],
    },{
      path: 'about',
      async lazy() {
      const componentModule = await import(/* webpackChunkName: "p_about-index" */ '@/pages/about/index');
      return {
        ...componentModule,
        Component: () => WrapRouteComponent({
          routeId: 'about',
          isLayout: false,
          routeExports: componentModule,
        }),
        loader: createRouteLoader({
          routeId: 'about',
          requestContext,
          renderMode,
          module: componentModule,
        }),
      };
    },
      errorElement: <RouteErrorComponent />,
      componentName: 'about-index',
      index: true,
      id: 'about',
      exact: true,
      exports: ["default"],
    },{
      path: '',
      async lazy() {
      const componentModule = await import(/* webpackChunkName: "p_index-index" */ '@/pages/index/index');
      return {
        ...componentModule,
        Component: () => WrapRouteComponent({
          routeId: '/',
          isLayout: false,
          routeExports: componentModule,
        }),
        loader: createRouteLoader({
          routeId: '/',
          requestContext,
          renderMode,
          module: componentModule,
        }),
      };
    },
      errorElement: <RouteErrorComponent />,
      componentName: 'index-index',
      index: true,
      id: '/',
      exact: true,
      exports: ["default"],
    },{
      path: 'windowEvent',
      async lazy() {
      const componentModule = await import(/* webpackChunkName: "p_windowevent" */ '@/pages/windowEvent');
      return {
        ...componentModule,
        Component: () => WrapRouteComponent({
          routeId: 'windowEvent',
          isLayout: false,
          routeExports: componentModule,
        }),
        loader: createRouteLoader({
          routeId: 'windowEvent',
          requestContext,
          renderMode,
          module: componentModule,
        }),
      };
    },
      errorElement: <RouteErrorComponent />,
      componentName: 'windowevent',
      index: undefined,
      id: 'windowEvent',
      exact: true,
      exports: [],
    },{
      path: 'protocol',
      async lazy() {
      const componentModule = await import(/* webpackChunkName: "p_protocol" */ '@/pages/protocol');
      return {
        ...componentModule,
        Component: () => WrapRouteComponent({
          routeId: 'protocol',
          isLayout: false,
          routeExports: componentModule,
        }),
        loader: createRouteLoader({
          routeId: 'protocol',
          requestContext,
          renderMode,
          module: componentModule,
        }),
      };
    },
      errorElement: <RouteErrorComponent />,
      componentName: 'protocol',
      index: undefined,
      id: 'protocol',
      exact: true,
      exports: ["UserProtocol"],
    },{
      path: '*',
      async lazy() {
      const componentModule = await import(/* webpackChunkName: "p_$" */ '@/pages/$');
      return {
        ...componentModule,
        Component: () => WrapRouteComponent({
          routeId: '*',
          isLayout: false,
          routeExports: componentModule,
        }),
        loader: createRouteLoader({
          routeId: '*',
          requestContext,
          renderMode,
          module: componentModule,
        }),
      };
    },
      errorElement: <RouteErrorComponent />,
      componentName: '$',
      index: undefined,
      id: '*',
      exact: true,
      exports: ["default"],
    },]
  },
]);
export default createRoutes;

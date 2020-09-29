/**
 *  There's only one dispatcher per application.
 *  The dispatcher is a central hub for the entire
 *  app and holds a list callback functions where
 *  all the actions from the UI will be dispatched
 *  via this dispatcher.
 *
 *  The stores will register with this dispatcher
 *  to be informed when actions occur.
 *
 */

// import Facebook's Flux Dispatcher
import { Dispatcher } from "flux";

// instantiate dispatcher
const dispatcher = new Dispatcher();

// export for global use
export default dispatcher;

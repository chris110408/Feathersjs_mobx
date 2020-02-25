import _, { flow } from "lodash/fp";
import F from "futil-js";
import { openNotificationWithIcon } from "./extend-antd";

const error = (extend = F.conversion.defaultsOn) =>
  F.aspect({
    onError: F.tapError(e => {
      openNotificationWithIcon("error", e.name, e.message);
    }),
    name: "error"
  });

const redirectCommand = (url, msg = "successful redirect") => (
  extend = F.defaultsOn
) =>
  F.aspect({
    after(result, _state, args) {
      if (args[0] && result) {
        const { res, history } = result;
        res && openNotificationWithIcon("success", msg);
        history.push(url);
      }
    },
    name: "redirectCommand"
  });

const redirectSaveTokenCommand = (url, msg = "successful redirect") => (
  extend = F.defaultsOn
) =>
  F.aspect({
    before(args) {
      console.log(args);
    },
    after(result, _state, args) {
      if (args[0] && result) {
        const { res, store } = result;
        res && openNotificationWithIcon("success", msg);
        if (res) {
          store.token = res.accessToken;
          store.currentUser = res.user;
          store.history.push(url);
        }
      }
    },
    name: "redirectSaveTokenCommand"
  });

const beforeAndAfter = extend =>
  F.aspect({
    before(args, state) {
      args[0].afterFn &&
        _.isFunction(args[0].beforeFn) &&
        args[0].beforeFn(args[0].beforeArg ? args[0].beforeArg : null);
    },
    after(result, state, args) {
      if (args[0].afterFn) {
        const { afterFn } = args[0];
        _.isEmpty(result) ? afterFn() : afterFn(result.arg);
      }
    },
    name: "beforeAndAfter"
  });

const _Command = extend =>
  flow(
    F.aspects.status(extend),
    F.aspects.clearStatus(),
    F.aspects.concurrency(extend),
    error(extend)
  );

const extraCommand = (fn1, fn2, ...args) =>
  flow(
    fn1(...args),
    fn2(...args)
  );

export {
  _Command,
  extraCommand,
  redirectCommand,
  redirectSaveTokenCommand,
  beforeAndAfter
};

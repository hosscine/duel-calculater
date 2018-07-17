let vueInstanciate = function(dic, el) {
  let dicClone = JSON.parse(JSON.stringify(dic));
  dicClone.el = el
  dicClone.methods = dic.methods
  dicClone.computed = dic.computed
  return (new Vue(dicClone))
}

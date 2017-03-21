export default function (Vue) {
    Vue.directive('animation', {
        bind:function(el,binding,vnode,oldVnode){
            
        },
        inserted: function (el,binding,vnode,oldVnode) {
            
        },
        update:function(el,binding,vnode,oldVnode){
            
        },
        componentUpdated:function(el,binding,vnode,oldVnode){
            
        },
        unbind:function(el,binding,vnode,oldVnode){

        }
    })

    Vue.directive('input-auto', {
        inserted: function (el,binding,vnode,oldVnode) {
            el.addEventListener('focus',function(){
                let node = getParentNode(el);
                if(node){
                    node.style.paddingBottom = '300px';
                }
            })
            el.addEventListener('blur',function(){
                let node = getParentNode(el);
                if(node){
                    node.style.paddingBottom = '0';
                }
            })
        }
    })
}

function getParentNode(parentNode,$class = 'scroll-content'){
    let node = null;
    while(node = parentNode.parentNode, !node.classList.contains($class)){
        console.info('ok')
        parentNode = node
        node = null;
    }
    return node;
}

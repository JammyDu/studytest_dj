var that;
class Tab {

    constructor(id) {
        that = this;
        //获取元素
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');

        //获取li的父元素
        this.ul = this.main.querySelector('.firstnav ul:first-child')
            //获取section父元素
        this.fsection = this.main.querySelector('.tabscon');
        this.init();

    }
    init() {
            this.updateNode();
            //初始化操作让相关的元素绑定操作
            this.add.onclick = this.addTab;
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab;
                this.remove[i].onclick = this.removeTab;
                this.spans[i].ondblclick = this.editTab;
                this.sections[i].ondblclick = this.editTab;

            }
        }
        //获取所有的小li 和 section
    updateNode() {
            this.lis = this.main.querySelectorAll('li');
            this.sections = this.main.querySelectorAll('section');
            this.remove = this.main.querySelectorAll('.icon-guanbi');
            this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
        }
        //1.切换功能
    toggleTab() {
        //console.log(this.index)
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';

    }
    clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }
        //2.添加功能
    addTab() {
            that.clearClass();
            //（1）创建li元素和section元素
            var random = Math.random();
            var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>'
            var section = '<section class="conactive">测试' + random + '</section>';
            //（2）把这两个元素追加到对应的父元素里面
            that.ul.insertAdjacentHTML('beforeend', li);
            that.fsection.insertAdjacentHTML('beforeend', section);
            that.init();


        }
        //3.删除功能
    removeTab(e) {
            e.stopPropagation(); //阻止冒泡 防止触发li的切换
            var index = this.parentNode.index;
            console.log(index);
            //根据索引号删除对应的li 和 section remove()方法可以直接删除指定的元素
            that.lis[index].remove();
            that.sections[index].remove();
            that.init();
            //当我们删除的不是选中状态的li 的时候，原来的选中状态的li保持不变
            if (document.querySelector('.liactive')) return;

            //当删除了选中状态的这个li的时候，让她的前一个li处于选定状态
            index--;
            //手动调用我们的点击事件 不需要鼠标触发
            that.lis[index] && that.lis[index].click();
        }
        //4.修改功能
    editTab() {
        var str = this.innerHTML;
        //双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.section.empty();
        //alert('11')
        this.innerHTML = '<input type = "text" />';
        var input = this.children[0];
        input.value = str;
        input.select(); //文本框里面的文字处于选定状态
        //当我们离开文本框就把文本框里面的值给span
        input.onblur = function() {
                this.parentNode.innerHTML = this.value;
            }
            //按下回车也可以把文本框里面的值给span
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                //手动调用表单失去焦点事件
                this.blur();
            }

        }
    }

}
new Tab('#tab');
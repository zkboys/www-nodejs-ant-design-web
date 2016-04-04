# 查询条件封装
一般查询条件的封装，使用时，通过配置一个简单的对象，调用SearchCondition组件，即可生成查询条件
## 参数说明
一般格式及说明如下：
```javascript
let conditionConfig = {
    showSearchBtn: true,              // 可选，默认true 是否显示查询按钮
    labelWidth: '80px',               // 可选，默认：‘80px’,防止有些label text太长，这里给个全局设置，每个条件可以覆盖这个属性。
    onSearch: function (data) {       // 必选，点击查询按钮时的回调函数 data为所有的查询条件数据，可以在这个函数中发起请求等操作。
        
    },
    conditionItems: [
        {// 如果是对象，自己占据一行
            type: 'select',            // 必须，查询条件类型
            name: 'testSelect',        // 必须，查询条件数据name
            label: '搜索下拉',          // 必须，查询条件显示的label
            labelWidth: '80px',        // 可选，默认为 conditionConfig.labelWidth，如果是Number类型，默认单位为px
            width: '150px',            // 可选，默认为150px，控制输入框等大小，如果是Number类型，默认单位为px
            searchOnChange: true,      // 可选，默认：false， 值改变是否出发onSearch函数
            placeHolder: '我是提示',    // 可选，默认为请输入[label],如果是select等选择类型，默认为：请选择[label]
            defaultValue: 'all',       // 可选，默认值，checkbox，checkboxButton这个值为数组。
            options: [                 // 可选/必须，单值条件（input等）没有这个属性，多值条件（checkbox，checkboxButton,radioButton等）组件专用属性
                {value: 'all', text: '全部'},
                {value: '1', text: '和平门'},
                {value: '2', text: '前门大街'},
                {value: '3', text: '东直门'},
                {value: '4', text: '宋家庄'}
            ]
        },
        [// 如果是数组，数组中所有的组件共占一行
            {
                name: 'store',
                label: '门店',
                type: 'input',
                searchOnChange: true
            },
            {
                name: 'name',
                label: '客户姓名',
                type: 'input',
                width: 300
            }
        ]
    ]
};
```
## 支持的类型

| 类型（type） | 说明 |
| ----------- | --- |
|input|普通文本输入框|
|combobox|智能提示输入框|
|select|下拉框|
|selectSearch|带搜索下拉框|
|selectMultiple|多选下拉框|
|selectCascaded|联动下拉（级联下拉）|
|radio|单选|
|radioButton|单选按钮|
|checkbox|多选|
|checkboxButton|多选按钮|
|date|日期|
|dateArea|日期区间|
|time|时间|
|timeArea|时间区间|
|dateTime|日期时间|
|dateTimeArea|日期时间区间|
|customer|用户自定义|

## type:customer 用户自定义
和其他type配置一样，只不过要多配置 component 必选属性
```javascript
{
    type: 'customer',
    name: 'customer',
    label: '用户自定义',
    component: InputItem
}
```
component如何编写，请参考其他系统提供的组件。

## 几个特殊组件
特殊组件有几个自己的属性
### combobox
separator //可选

###  selectCascaded
```
{
    type: 'selectCascaded',
    items: [// 和 conditionItems 的配置相同，多了一个getNextOptions，
        {
            type: 'select',
            name: 'select1',
            label: '一级下拉',
            searchOnChange: true,
            options: [
                {value: 'all', text: '全部'},
                {value: '1', text: '和平门'},
                {value: '2', text: '前门大街'},
                {value: '3', text: '东直门'},
                {value: '4', text: '宋家庄'}
            ],
            getNextOptions: function (value) {//根据当前下拉value，获取下一个下拉的options
                return [
                    {value:  value + '-1', text: value + '-1'},
                    {value:  value + '-2', text: value + '-2'},
                    {value:  value + '-3', text: value + '-3'},
                    {value:  value + '-4', text: value + '-4'}
                ]
            }
        },
        {// 2级以后的下拉不要配置options选项
            type: 'selectSearch',
            name: 'select2',
            label: '二级下拉',
            searchOnChange: true,
            getNextOptions: function (value) {
                return [
                    {value:  value + '-1', text: value + '-1'},
                    {value:  value + '-2', text: value + '-2'},
                    {value:  value + '-3', text: value + '-3'},
                    {value:  value + '-4', text: value + '-4'}
                ]
            }
        },
        {
            type: 'selectMultiple',// 支持多选意义不大
            name: 'select3',
            label: '三级下拉',
            searchOnChange: true
        }
    ]
}
```


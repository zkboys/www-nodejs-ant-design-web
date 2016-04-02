import React from 'react';
import { Breadcrumb, Select } from 'antd'
import Page from '../../framework/page/Page';
const Option = Select.Option;
class ListPage extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        loading: false
    };

    render() {
        return (
            <Page header="auto" loading={this.state.loading}>
                <div className="search-area">
                    <Select showSearch
                            style={{ width: 200 }}
                            placeholder="请选择人员"
                            optionFilterProp="children"
                            notFoundContent="无法找到"
                            searchPlaceholder="输入关键词"
                            onChange={handleChange}>
                        <Option value="jack">杰克</Option>
                        <Option value="lucy">露西</Option>
                        <Option value="tom">汤姆</Option>
                    </Select>
                </div>
                <div className="top-tool-bar">
                    顶部工具条
                </div>
                <div className="data-table">
                    表格
                </div>
                <div className="bottom-tool-bar">
                    底部工具条
                </div>
            </Page>
        );
    }
}
export default ListPage;

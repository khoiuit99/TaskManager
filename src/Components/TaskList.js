import React, {Component} from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component{

    constructor(props){
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1
        }
    }

    onUpdateStatus = () => {
        
    }

    onDelete = () => {

    }
    onUpdate = () => {
        
    }

    onChange = (event) => {
        var target = event.target;
        var value = target.value;
        var name = target.name;
        this.props.onFilter(
                name === 'filterName' ? value : this.state.filterName,
                name === 'filterStatus' ? value : this.state.filterStatus
            );
        this.setState({
            [name] : value
        })
    }

    render(){

        var { tasks } = this.props;
        var { filterName, filterStatus } = this.state;
        var ElmTask = tasks.map((task, index) => {
            return <TaskItem    key = {task.id} 
                                index = {index} 
                                task = {task} 
                                onUpdateStatus = {this.props.onUpdateStatus} 
                                onDelete={this.props.onDelete}
                                onUpdate={this.props.onUpdate}/>
        });
    return (
    	<div>
    		<div>
                <div className="table">
                    <table className="table table-bordered">
                        <caption>List of tasks</caption>
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row"></th>
                                <td>
                                    <input 
                                        className="form-control form-control-sm" 
                                        type="text" placeholder="Search" 
                                        name="filterName"
                                        value = { filterName }
                                        onChange={ this.onChange }/>
                                </td>
                                <td>
                                    <select 
                                            className="custom-select custom-select-sm" 
                                            name="filterStatus"
                                            value = { filterStatus }
                                            onChange={ this.onChange }>
                                        <option value={-1}>Tất cả</option>
                                        <option value={0}>Kích hoạt</option>
                                        <option value={1}>Ẩn</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                                {ElmTask}
                        </tbody>
                    </table>
                </div>
            </div>
    	</div>
    );
}
}
export default TaskList;

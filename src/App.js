import React, {Component} from 'react';
import TaskForm from './Components/TaskForm';
import Control from './Components/Control';
import TaskList from './Components/TaskList';

class App extends Component{

    
    constructor(props){
        super(props);
        this.state={
            tasks:[],
            isDisplayForm : false,
            taskEditting : null,
            filter : {
                name : '',
                status : -1
            },
            FindName : '',
            sortBy : 'name',
            sortValue : 1
        }
    }

    UNSAFE_componentWillMount(){
        if(localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks : tasks
            });
        }
    }

    rdstring(){
        var randomstring = require("randomstring");
        return randomstring.generate();
    }

    onToggleForm = () => {
        if(this.state.isDisplayForm && this.state.taskEditting !== null){
            this.setState({
                isDisplayForm : true,
                taskEditting : null
            });
        }else{
            this.setState({
                isDisplayForm : !this.state.isDisplayForm,
                taskEditting : null
            });
        }
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm : false
        });   
    }

    onShowForm = () => {
         this.setState({
            isDisplayForm : true
        });   
    }

    onSubmit = (data) => {
        var {tasks} = this.state;
        if(data.id === ''){
            data.id = this.rdstring();
            tasks.push(data);
        }else{
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({
            tasks:tasks,
            taskEditting:null
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));

    }

    onUpdateStatus = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        if(index !== -1){
            tasks[index].status = !tasks[index].status;
        this.setState({
            tasks : tasks
            });
        }
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    findIndex = (id) => {
        var {tasks} = this.state;
        var result = -1
        tasks.forEach((task, index) => {
            if(task.id === id){
                result = index
            }
        });
            return result;
        }

    onDelete = (id) => {
        var{tasks} = this.state;
        var index = this.findIndex(id);
        if(index !== -1){
            tasks.splice(index,1);
            this.setState({
                tasks : tasks
            });
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.onCloseForm();
    }

    onUpdate = (id) => {
        var{tasks} = this.state;
        var index = this.findIndex(id);
        var taskEditting = tasks[index];
        this.setState({
            taskEditting:taskEditting
        });
        this.onShowForm();
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus,10);
        this.setState({
            filter:{
                name : filterName,
                status : filterStatus
            }
        });
    }

    onFind = (FindName) => {
        this.setState({
            FindName : FindName
        });
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy : sortBy,
            sortValue : sortValue
        });
    }

    render(){

        var {tasks, isDisplayForm, taskEditting, filter, FindName, sortBy, sortValue} = this.state;
        if(filter){
            if(filter.name){
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                });
            }
            tasks = tasks.filter((task) => {
                if(filter.status === -1){
                    return task;
                }else{
                    return task.status === (filter.status === 1 ? true : false);
                    }
                });
        }

        if(FindName){
            tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(FindName) !== -1;
                });
        }

        if(sortBy === 'name'){
            tasks = tasks.sort((a,b) => {
                if(a.name > b.name) return sortValue;
                else if(a.name < b.name) return -sortValue;
                return 0;
            })
        }else{
            tasks = tasks.sort((a,b) => {
                if(a.status > b.status) return sortValue;
                else if(a.status < b.status) return -sortValue;
                return 0;
            })
        }


        var elmForm = isDisplayForm ? <TaskForm 
                                            onCloseForm={this.onCloseForm} 
                                            onSubmit = {this.onSubmit}
                                            task = {taskEditting}/> : '';

    return(
        <div className="container">   
            ​<h1 className="text-center">Quản lý công việc </h1>
                <div className="row">
                    <div className={ isDisplayForm ? 'col-md-4' : '' }>
                        {elmForm}
                    </div>
                    <div className={ isDisplayForm ? 'col-md-8' : 'col-md-12' }>
                        <div>
                            <button type="button" className="btn btn-primary" onClick = {this.onToggleForm}>
                                Thêm Công Việc <span className="fas fa-plus"></span>
                            </button>                   
                        </div>
                        <br/>
                        <div>   
                            <Control onFind={this.onFind} onSort={this.onSort} sortBy = {sortBy} sortValue = {sortValue}/>
                        </div>
                        <br/>
                        <div>
                            <TaskList 
                                    tasks = {tasks} 
                                    onUpdateStatus={this.onUpdateStatus} 
                                    onDelete={this.onDelete}
                                    onUpdate={this.onUpdate}
                                    onFilter={this.onFilter}/>
                        </div>
                    </div>
                </div>
        </div>
    );
}
}

export default App;

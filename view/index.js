'use strict';

const App = React.createClass({

    getInitialState: function () {

        return {
            todolist: [],
            temp: []
        }
    },

    addEvent: function (event) {
        const task = this.refs.addTask;

        if (event.key != "Enter") {
            return;
        }
        if (event.key === "Enter" && task.value === '') {
            alert("can't input empty task");
            return;
        }

        let todolist = this.state.todolist;
        const todo = {
            completed: false,
            value: task.value
        };
        todolist.push(todo);
        this.setState({temp:todolist});
    },

    deleteEvent: function (index) {
        const todolist = this.state.todolist;
        todolist.splice(index, 1);
        this.setState({todolist});
        this.setState({temp: todolist});
    },

    changeState: function (index) {
        const todolist = this.state.todolist;
        todolist[index].completed = !todolist[index].completed;
        this.setState({todolist});
        this.setState({temp: todolist});
    },

    completed: function () {
        let temp = this.state.todolist;
        temp = temp.filter(todo => todo.completed);
        this.setState({temp});
    },

    all:function () {
      this.setState({temp:this.state.todolist});
    },

    active:function () {
        let temp = this.state.todolist;
        temp = temp.filter(todo => !todo.completed);
        this.setState({temp});
    },

    render: function () {

        return <div>
            <Header/>
            <div>
                <input type="text" ref="addTask" placeholder="what needs to be done" onKeyPress={this.addEvent}/>
            </div>
            <TodoList temp={this.state.temp} onDelete={this.deleteEvent} onChange={this.changeState}/>
            <Footer onCompleted={this.completed}  onAll={this.all} onActive={this.active} elements={this.state.todolist}/>
        </div>
    }
});

const Header = React.createClass({

    render: function () {
        return <div>
            <h1>todolist</h1>
        </div>
    }
});

const TodoList = React.createClass({
    delete: function (index) {
        this.props.onDelete(index);
    },

    change: function (index) {
        this.props.onChange(index);
    },

    render: function () {
        const items = this.props.temp.map((element, index)=> {
            return <div key={index}>
                <input type="checkbox" checked={element.completed}
                       onClick={this.change.bind(this, index)}/>{element.value}

                <button onClick={this.delete.bind(this, index)}>-</button>
            </div>
        });

        return <ul>
            {items}
        </ul>
    }
});

const Footer = React.createClass({

    render: function () {
        const element = this.props.elements.map(element => (element.completed ? 0:1)).reduce((a,b) =>  (a + b ),0);
        return <div>
            <button>{element} items left</button>
            <button onClick={this.props.onAll}>all</button>
            <button onClick={this.props.onCompleted}>Completed</button>
            <button onClick={this.props.onActive}>active</button>
        </div>
    }
});

ReactDOM.render(<App/>, document.getElementById('content'));
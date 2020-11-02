import app, { Component } from 'apprun';


type Task = {
    id: number;
    text: string;
    owner: number;
    status: 'open' | 'in-progress' | 'complete';
    editing: true | false;
    oldText?: string;
    cursorPosition?: number;

  }

  const STORAGE_KEY: string = 'to-do-list-'



export default class TaskComponent extends Component
{
    state = {
        tasks: [],
        value: '',
        type: 'my',
        title: 'My Todos',
        storageKey: `${STORAGE_KEY}-my`
    }

    view = (state) => <div>
    <h1>Kanban | Task Page</h1> 
    <button>Return Home</button>
    <h2>Project Title</h2>
    <section>
        <h2>{state.title}</h2>
        <ul>
            {state.tasks.map( (task:Task) => {
               return( <li key={task}>
                    <span contenteditable={task.editing} 
                          onclick={(e)=>this.run("toggleEditable", task.id, e)}
                          onkeyup={(e)=>this.run("updateTask", task.id, e )}>{task.text}</span> &nbsp;
                    {task.status === "open" ?
                        <button onclick={ () => this.run('markDoing', task.id)}>Doing</button>
                      : task.status === "in-progress" ?
                        <button onclick={ () => this.run('markDone', task.id)}>Done</button>
                        : task.status === "complete" ?
                        <button onclick={ () => this.run('deleteTask', task.id)}>Delete</button>
                        : <button onclick={ () => this.run('markDoing', task.id)}>Doing</button>
                    }
                </li> )
            })}
        </ul>
    </section>
    <section>
        <form onsubmit={e => this.run('addTask', e)}>
            <input name="text" type="text" placeholder="Add a task" required/>
            <button>Add</button>
        </form>
    </section>
   
    </div>;

    update = {
        addTask: async (state, event) => {
            event.preventDefault()
            const data = new FormData(event.target)
            const task:Task = {
                id: state.tasks.length + 1,
                owner: 0,
                text: data.get("text").toString(),
                status: "open",
                editing: false
            }
            event.target.text.value = ""
            return {...state, tasks: [...state.tasks, task]}
        },
        markDoing: async (state, id) => {
            const tasks = state.tasks.map((task) => {
                if(task.id === id) {
                    return {
                        ...task,
                        status: "in-progress"
                    }
                }
                return task
            })
            return {...state, tasks}
        },
        markDone: async (state, id) => {
            const tasks = state.tasks.map((task) => {
                if(task.id === id) {
                    return {
                        ...task,
                        status: "complete"
                    }
                }
                return task
            })
            return {...state, tasks}
        },
        deleteTask: async (state, id) => {
            return {
                ...state,
                tasks: [...state.tasks.filter((task) => task.id !== id)]
            }
        },
        toggleEditable: async (state, id, event) => {
            const cursorPosition = EditCaretPositioning.saveSelection(event.currentTarget);
            if(state.tasks.find(task => task.id===id).editing===false){
                return {...state, tasks: [...state.tasks.map( (task) => task.id === id ?
                    ({...task, editing: !task.editing, oldText: task.text, cursorPosition})
                    :
                    (task)
                )]}
            } else {
                return {...state, tasks: [...state.tasks.map( (task) => task.id === id ?
                    ({...task, editing: !task.editing, oldText: "", cursorPosition: null})
                    :
                    (task)
                )]}
            }
        },
        updateTask: async (state, id, event) => {
            const savedCaretPosition = EditCaretPositioning.saveSelection(event.currentTarget)
            if(event.key==="Escape"){
                /* Here, you need to set the event.currentTarget.textContent back */
                return {...state,
                  tasks: [...state.tasks.map(task => task.id===id
                    ? ({...task, text: task.oldText, oldText: "", editing: false })
                    : (task) 
                )]}
            } else if (event.key==='Enter'){
                return {...state, 
                  tasks: [...state.tasks.map(task => task.id===id
                    ? ({...task, oldText: "", editing: false})
                    : (task)
                )]}
            } else {
                return {...state,
                  tasks: [...state.tasks.map(task => task.id===id
                    ? ({...task, text: event.currentTarget.textContent, cursorPosition: savedCaretPosition})
                    : (task)
                  )]};
            }
        }
    }
    //this will make it easy to have multiple task components on a givenpage. Allow us to identify, tag and title. Will make easier to connect to the project page.
    constructor(props) {
        super()
        const storageKey:string = `${STORAGE_KEY}${props['type']}`
        const stored:string = localStorage.getItem(storageKey)
        this.state = stored ? JSON.parse(stored) : {...this.state, ...props, storageKey}
    }
    rendered = (state) => localStorage.setItem(this.state.storageKey, JSON.stringify(state))
}
const EditCaretPositioning =( ()=>{
    let saveSelection:Function, restoreSelection: Function;

    
        //saves caret position(s)
        saveSelection = function(containerEl) {
            var range = window.getSelection().getRangeAt(0);
            var preSelectionRange = range.cloneRange();
            preSelectionRange.selectNodeContents(containerEl);
            preSelectionRange.setEnd(range.startContainer, range.startOffset);
            var start = preSelectionRange.toString().length;
    
            return {
                start: start,
                end: start + range.toString().length
            }
        };
        //restores caret position(s)
        restoreSelection = function(containerEl, savedSel) {
            var charIndex = 0, range = document.createRange();
            range.setStart(containerEl, 0);
            range.collapse(true);
            var nodeStack = [containerEl], node, foundStart = false, stop = false;
    
            while (!stop && (node = nodeStack.pop())) {
                if (node.nodeType === 3) {
                    var nextCharIndex = charIndex + node.length;
                    if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
                        range.setStart(node, savedSel.start - charIndex);
                        foundStart = true;
                    }
                    if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
                        range.setEnd(node, savedSel.end - charIndex);
                        stop = true;
                    }
                    charIndex = nextCharIndex;
                } else {
                    var i = node.childNodes.length;
                    while (i--) {
                        nodeStack.push(node.childNodes[i]);
                    }
                }
            }
    
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    return { saveSelection, restoreSelection}
})()
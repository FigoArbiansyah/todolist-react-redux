import { useState } from 'react';
import Card from './components/Card'
import Input from './components/Input';
import './styles/App.css'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, checkTodo, deleteTodo } from './store/reducers/todolist';

function App() {
  const dispatch = useDispatch();
  const [id, setId] = useState(Date.now());
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [completed, setCompleted] = useState(false);
  const todos = useSelector((state) => state.todolist.value);

  const [editing, setEditing] = useState(false);


  const handleChange = (value, setState) => setState(value);

  const resetForm = () => {
    setId(Date.now());
    setTitle('');
    setBody('');
    setCompleted(false);
    setEditing(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = {
      id, title, body, completed,
    }
    dispatch(addTodo(request));
    resetForm();
  }

  const handleDelete = (id) => {
    const deleteConfirmation = confirm("Apakah kamu yakin ingin menghapus ini?");
    if (deleteConfirmation) {
      dispatch(deleteTodo(id));
    }
    resetForm();
  }
  
  const handleCheck = (id) => {
    dispatch(checkTodo(id));
    resetForm();
  }

  const handleEdit = (item) => {
    setId(item?.id);
    setTitle(item?.title);
    setBody(item?.body);
    setCompleted(item?.completed);
    setEditing(true);
  }

  const handleCancel = () => {
    setEditing(false);
    resetForm();
  }

  return (
    <main className={classes.main}>
      <div className={classes.main_div}>
        <h1 className={classes.main_div_h1}>CATATANKU</h1>
        <section className="grid gap-10 pt-6">
          <div className='md:w-[30rem] w-full mx-auto'>
            <form method='post' onSubmit={handleSubmit}>
              <Input
                placeholder='Judul'
                value={title}
                onChange={(e) => handleChange(e.target.value, setTitle)}
                style={{
                  marginBottom: 10,
                }}
                required
              />
              <Input
                placeholder='Isi'
                value={body}
                onChange={(e) => handleChange(e.target.value, setBody)}
                style={{
                  marginBottom: 10,
                }}
                required
              />
              <div className="flex gap-2.5">
                {editing && (
                  <button type='button' className="py-2 px-4 w-full bg-gray-500 rounded" onClick={() => handleCancel()}>
                    Batal
                  </button>
                )}
                <button type='submit' className="py-2 px-4 w-full bg-indigo-500 rounded">
                  Simpan
                </button>
              </div>
            </form>
          </div>
          <section className={classes.grid_section}>
            {todos?.map((item, index) => {
              return (
                <Card
                  key={index}
                  item={item}
                  onEdit={(_item) => handleEdit(_item)}
                  onDelete={(id) => handleDelete(id)}
                  onCheck={(id) => handleCheck(id)}
                />
              )
            })}
          </section>
        </section>
      </div>
    </main>
  )
}

const classes = {
  main: 'p-10 flex justify-center min-h-screen bg-slate-700 text-[#F5F5F5]',
  main_div: 'w-full',
  main_div_h1: 'text-xl text-center font-bold mb-5',
  grid_section: 'grid md:grid-cols-2 gap-4'
}

export default App

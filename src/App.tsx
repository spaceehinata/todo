import {
  Add,
  DarkModeOutlined,
  Delete,
  Edit,
  LightModeOutlined,
  Save,
  Search
} from '@mui/icons-material'
import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SelectChangeEvent,
  styled,
  TextField,
  ThemeProvider
} from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router'
import empty from './assets/empty.png'
import CustomOutlinedInput from './components/CustomOutlinedInput'
import CustomSelect from './components/CustomSelect'
import theme from './theme'

const StyledFab = styled(Fab)(({ theme }) => ({
  background: '#6C63FF',
  color: '#FFF',
  position: 'fixed',
  right: 32,
  bottom: 32,
  zIndex: 1000
}));

const StyledButton = styled(ButtonBase)(({ theme }) => ({
  color: '#FFF',
  borderRadius: '5px',
  background: '#6C63FF',
  padding: '8px'
}));

const StyledTodoContainer = styled(Box)(({ theme }) => ({
  width: 'min(100%, 500px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '30px'
}))

const loadFromLocalStorage = (): Todo[] => {
  const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY)
  return storedTodos ? JSON.parse(storedTodos) : []
}

const saveToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}

interface Todo {
  text: string
  completed: boolean
}

const LOCAL_STORAGE_KEY = 'todos'

const Todos: React.FC = () => {
  const { mode, setMode } = useColorScheme()
  const [value, setValue] = useState<string>('all')
  const [todos, setTodos] = useState<Todo[]>(() => loadFromLocalStorage())
  const [newTodo, setNewTodo] = useState<string>('')
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editedTodo, setEditedTodo] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    saveToLocalStorage(todos)
  }, [todos])

  const options = [
    { value: 'all', label: 'All' },
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' }
  ]

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setValue(event.target.value as string)
  }

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos((prevTodos) => [
        ...prevTodos,
        { text: newTodo.trim(), completed: false }
      ])
      setNewTodo('')
      setIsDialogOpen(false)
    }
  }

  const handleDeleteTodo = (index: number) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index))
  }

  const handleEditTodo = (index: number) => {
    setEditIndex(index)
    setEditedTodo(todos[index].text)
  }

  const handleSaveEdit = () => {
    if (editIndex !== null && editedTodo.trim() !== '') {
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos]
        updatedTodos[editIndex].text = editedTodo.trim()
        return updatedTodos
      })
      setEditIndex(null)
      setEditedTodo('')
    }
  }

  const handleToggleComplete = (index: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const filteredTodos = todos
    .filter((todo) => {
      if (value === 'complete') return todo.completed
      if (value === 'incomplete') return !todo.completed
      return true
    })
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    )

  if (!mode) return null

  return (
    <Box
      sx={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          maxWidth:'750px',
          width:'100%'
        }}
      >
        <CustomOutlinedInput
          placeholder="Search todos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          endAdornment={<Search />}
          sx={{
            height: '38px',
            width: '100%',
            maxWidth: '595px'
          }}
        />
        <Box sx={{ width: '85px', height: '38px' }}>
          <CustomSelect
            value={value}
            onChange={handleChange}
            options={options}
            sx={{
              width: '85px',
              height: '38px',
              fontSize: '10px',
              backgroundColor: '#6C63FF',
              color: '#FFF',
              fontWeight: '500',
              fontSize: '18px'

            }}
          />
        </Box>
        <StyledButton
          onClick={() => {
            setMode(mode === 'light' ? 'dark' : 'light')
          }}
        >
          {mode === 'light' ? <DarkModeOutlined /> : <LightModeOutlined />}
        </StyledButton>
      </Box>

      <StyledTodoContainer>
        {filteredTodos.length > 0 ? (
          <List sx={{ width: '100%' }}>
            {filteredTodos.map((todo, index) => (
              <ListItem
                key={index}
                 sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  maxWidth: '500px'
                }}   
                secondaryAction={
                  editIndex === index ? (
                    <IconButton
                      edge="end"
                      aria-label="save"
                      onClick={handleSaveEdit}
                    >
                      <Save />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditTodo(index)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteTodo(index)}
                      >
                        <Delete />
                      </IconButton>
                    </>
                  )
                }
              >
                <Checkbox
                size="medium"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(index)}
                />
                {editIndex === index ? (
                  <TextField
                    fullWidth
                    value={editedTodo}
                    onChange={(e) => setEditedTodo(e.target.value)}
                  />
                ) : (
                  <ListItemText
                    primary={todo.text}
                      primaryTypographyProps={{
                        fontSize: '20px',
                        fontWeight: '500',
                        color:'#252525'
            }}
                    sx={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                    }}
                  />
                )}
              </ListItem>
            ))}
          </List>
        ) : (
         <Box display="flex" flexDirection="column" alignItems="center">
            <img src={empty} alt="No todos" style={{ maxWidth: '100%', marginBottom: '20px' }} />
            <p style={{ color: '#252525', fontSize: '20px' }}>Empty...</p>
          </Box>

        )}
      </StyledTodoContainer>

      <StyledFab onClick={() => setIsDialogOpen(true)}>
        <Add color="inherit" />
      </StyledFab>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        PaperProps={{
          sx: {
            width: '500x',
            maxWidth: '90%'
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center' }}>NEW NOTE</DialogTitle>
        <DialogContent sx={{ paddingBottom: '110px' }}>
          <CustomOutlinedInput
            fullWidth
            placeholder="Input your note..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button
            onClick={() => setIsDialogOpen(false)}
            variant="outlined"
            sx={{
              borderColor: '#6C63FF',
              color: '#6C63FF',
              '&:hover': {
                borderColor: '#6C63FF',
                backgroundColor: 'transparent', 
                color: '#6C63FF'
              }
            }}
          >
            CANCEL
          </Button>
          <Button
            onClick={handleAddTodo}
            variant="contained"
            sx={{
              backgroundColor: '#6C63FF',
              color: '#FFF',
              '&:hover': {
                backgroundColor: '#584ee3' 
              }
            }}
          >
            APPLY
          </Button>
        </DialogActions>

      </Dialog>
    </Box>
  )
}

export default function ToggleColorMode() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box>
          <Routes>
            <Route path="/" element={<Todos />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  )
}

import mongoose, { Schema } from './index'
import base, { postFunc, preFunc } from './base'

const TodoShema = new Schema(
	{
		task: { type: String, maxlength: 200 },
		image: { type: String, maxlength: 200 },
		done: { type: Boolean, default: false },
		...base,
	},
	{
		versionKey: false,
	},
)

TodoShema.pre('save', next => preFunc(next))
TodoShema.post('save', doc => postFunc(`Todo ${doc._id} was saved`))

// TodoShema.methods.test = () => console.log('>test')

const Todo = mongoose.model('Todo', TodoShema)
export default Todo

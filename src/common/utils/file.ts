import { Request, Response } from 'express'
import * as multer from 'multer'
import * as path from 'path'
import config from '../config'

const storage = multer.diskStorage({
	destination: path.join(__dirname, config.uploadPath),
	filename: (req: Request, file: any, cb: any) => {
		cb(null, `${file.fieldname}-${Date.now()}`)
	},
})

class File {

	public upload: any

	constructor() {
		this.upload = multer({ storage }).single(config.uploadFieldName)
	}

	public doUpload = (req: Request, res: Response) => {
		const file = req.file

		res.json({
			path: `${config.apiURL}/file/assets/uploads/${file.filename}`,
		})
	}
}

const files = new File()

export default files

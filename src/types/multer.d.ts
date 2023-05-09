declare module "multer" {
  import { Request } from "express"

  interface File extends Express.Multer.File {}

  interface Multer {
    (options?: any): any
    single(fieldname: string): any
    array(fieldname: string, maxCount?: number): any
    fields(fields: Array<{ name: string; maxCount?: number }>): any
    none(): any
  }

  function multer(options?: any): Multer

  namespace multer {
    export type Instance = Multer
    export type File = Express.Multer.File
    export type Field = Express.Multer.Field
    export type Options = Express.Multer.Options
    export type StorageEngine = Express.Multer.StorageEngine
    export type Limits = Express.Multer.Limits
  }

  function diskStorage(options?: any): Express.Multer.StorageEngine

  function memoryStorage(options?: any): Express.Multer.StorageEngine

  export = multer
}

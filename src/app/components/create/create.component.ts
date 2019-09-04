import { Component, OnInit } from '@angular/core';

import {Project} from '../../models/project'
import {ProjectService} from '../../services/projects.service'
import {UploadService} from '../../services/upload.service'
import {Global} from '../../services/global'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string
  public project: Project
  public status: string
  public filesToUpload: Array<File>
  public save_project: any

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) { 
    this.title = "Crear Projecto"
    this.project = new Project('','','','', 2019 ,'','')
  }

  ngOnInit() {
  }

  onSubmit(form){
    //console.log(this.project,'objeto dentro de la funcion')
    //Guardar los Datos del Formulario
    const newProject = this.project
    this._projectService.saveProject(newProject).subscribe(
      response => {
        if(response.project) {

          //Subir Imagen Seleccionada
          if(this.filesToUpload){

            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id,[], this.filesToUpload, 'image')
            .then((result:any) => {
              this.status = 'success'
              this.save_project = result.project
              form.reset()
            })
          }else {
            this.save_project = response.project
            this.status = 'success'
            form.reset()
          }

        }else{
          this.status = 'failed'
        }
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  fileChangeEvent(fileInput: any) {
   // console.log(fileInput)
    this.filesToUpload = <Array<File>>fileInput.target.files
  }

}

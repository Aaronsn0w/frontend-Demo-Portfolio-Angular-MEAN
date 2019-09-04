import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'

import {Project} from '../../models/project'
import {ProjectService} from '../../services/projects.service'
import {UploadService} from '../../services/upload.service'
import {Global} from '../../services/global'

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  public title: string
  public project: Project
  public status: string
  public filesToUpload: Array<File>
  public save_project: any
  public url: string

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.url = Global.url
    this.title = "Editar Projecto"
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params.id
      
      this.getProject(id)
    })
  }
  
  getProject(id) {
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  onSubmit(form) {
    this._projectService.updateProject(this.project).subscribe(
      response => {
        
                //Subir Imagen Seleccionada
          if(this.filesToUpload){

            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id,[], this.filesToUpload, 'image')
            .then((result:any) => {
              this.status = 'success'
              this.save_project = result.project
              // console.log(result)
            })
          } else {
            this.status = 'success'
            this.save_project = response.project
          }

        
      },
      error => {
          console.log(<any>error)
      }
    )
  }

  fileChangeEvent(fileInput: any) {
     this.filesToUpload = <Array<File>>fileInput.target.files
   }

}

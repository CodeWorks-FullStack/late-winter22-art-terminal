import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'



class ProjectsService{



  async create(projectData){
    const res = await api.post('api/projects', projectData)
    logger.log('project Data',res.data)
    AppState.projects.unshift(res.data)
    // NOTE use this line if you have front-end data models
    // AppState.projects.push(new Project(res.data))
  }



}

export const projectsService = new ProjectsService()

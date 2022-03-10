import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'



class ProjectsService{

  async getAll(query = {}){
    const res = await api.get('api/projects', {params: query})
    logger.log('[projects get all]',res.data)
    AppState.projects = res.data
  }


  async create(projectData){
    const res = await api.post('api/projects', projectData)
    logger.log('project Data',res.data)
    AppState.projects.unshift(res.data)
    // NOTE use this line if you have front-end data models
    // AppState.projects.push(new Project(res.data))
  }

  setActive(project){
    AppState.activeProject = project
  }

  async remove(id){
    const res = await api.delete('api/projects/'+ id)
    logger.log('[delete project]', res.data)
    AppState.activeProject = {}
    AppState.projects = AppState.projects.filter(p => p.id != id)
  }



}

export const projectsService = new ProjectsService()

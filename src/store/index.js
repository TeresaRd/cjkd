import { observable, action } from 'mobx'
import { getStorage, setStorage } from "../lib";
import { allSubject } from "../api";

class Store {
  constructor() {
    getStorage('subjects').then(res => {
      this.subjectList = JSON.parse(res.data).slice(0,3);
    }).catch(() => {this.getSubjectList()})
  }
  @observable subjectList = [];
  @action setSubjectList(list) {
    this.subjectList = list;
    setStorage('subjects', JSON.stringify(list));
  }
  @action getSubjectList() {
    allSubject().then(data => {
      this.setSubjectList(data || [])
    })
  }

}
export default new Store()

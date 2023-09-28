'use client';
import Header from '@/components/header'
import Input from '@/components/input';
import {END_POINT} from '@/conifig/end-point'
import axios from 'axios'
import { useEffect, useState } from 'react';
import AutoCompliteSelect from '@/components/AutoCompliteSelect';
import SelectDate from '@/components/SelectDate'
import WorkingHistory from '@/components/WorkingHistory'
import AutoCompliteTags from '@/components/AutoCompliteTags';
import ModalAddExp from '@/components/ModalAddExp';
import AddEducation from '@/components/AddEducation';
import AddLang from '@/components/AddLang'
import SelectEmploymentTypes from "@/components/SelectEmploymentTypes"
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { editResume, getResumeById } from '@/app/store/slices/resumeSlice';

export default function CreateResume() {

    const router = useRouter()
    const dispatch = useDispatch();

    const {id} = useParams();
    const resume = useSelector(state => state.resume.resume)
    const [cities, setCities] = useState([])
    const [countries, setCountries] = useState([])
    const [allSkills, setSkills] = useState([])
    const [allEmploymentTypes, setEmploymentTypes] = useState([])
    const [workingHistories, setWorkingHistories] = useState([])
    const [modalExpIsOpen, setModalExpIsOpen] = useState(false)
    const [first_name, setName] = useState("")
    const [last_name, setSurname] = useState("")
    const [phone, setPhone] = useState("")
    const [cityId, setCity] = useState()
    const [birthday, setBirthday] = useState()
    const [gender, setGender] = useState("")
    const [citizenship, setCitizenship] = useState()
    const [position, setPosition] = useState("")
    const [salary, setSalary] = useState()
    const [salary_type, setSalaryType] = useState("KZT")
    const [skills, setSelectedSkills] = useState("")
    const [education, setEducation] = useState([])
    const [foreignLanguages, setForeignLanguages] = useState([])
    const [employmentTypes, setSelectedEmpTypes] = useState([])
    const [about, setAbout] = useState("")

    useEffect(() => {
        console.log("didMount")
        dispatch(getResumeById(id))
        axios.get(`${END_POINT}/api/region/cities`).then(res => {
            setCities(res.data)
        })

        axios.get(`${END_POINT}/api/region/countries`).then(res => {
            setCountries(res.data)
        })

        axios.get(`${END_POINT}/api/skills`).then(res => {
          setSkills(res.data)
        })

        axios.get(`${END_POINT}/api/employment-types`).then(res => {
          setEmploymentTypes(res.data)
        })
    }, [])

    useEffect(()=> {
        if(resume.id) {
            setCity(resume.cityId)
            setSelectedEmpTypes(resume.employmentTypes.map(et=>et.id))
            setName(resume.first_name)
            setSurname(resume.last_name)
            setPhone(resume.phone)
            setGender(resume.gender)
            setCitizenship(resume.citizenship)
            setPosition(resume.position)
            setSalary(resume.salary)
            setSalaryType(resume.salary_type)
            setWorkingHistories(resume.workingHistories)
            setAbout(resume.about)
            setSelectedSkills(resume.skills)
            setEducation(resume.education)
            setForeignLanguages(resume.foreignLanguages)
            console.log(resume.foreignLanguages)

        }
       

    }, [resume])

    


    const closeModalExp = () => {
      setModalExpIsOpen(false)
    }

    const addWorkingHistory = (item) => {
      setWorkingHistories([...workingHistories, item])
      closeModalExp();
    } 

    const removeWorkingHistory = (workingHistory) => {
      let wh = [...workingHistories]
      let index = workingHistories.indexOf(workingHistory)
      wh.splice(index, 1);
      setWorkingHistories(wh)
    }

    const handleGendreChange = (e) => {
      setGender(e.target.value)
      
    }



    const onSkillsChange = (data) => {
      const arr = data.map(item => item.name) 
      setSelectedSkills(arr.join(","))
    }


    const handleSave = ()=> {
      dispatch(editResume({
        id:resume.id,
        first_name,
        last_name,
        phone,
        cityId,
        birthday,
        gender,
        citizenship,
        position,
        about,
        salary,
        salary_type,
        workingHistories,
        skills,
        education,
        employmentTypes,
        foreignLanguages,
        main_language: "",
      }, router))
      
    }

   let eds = education.map(ed => {
        const end = new Date(ed.end_date)
        console.log(end, end.getFullYear())
        return {
        ...ed,
        end_date: end.getFullYear()
        }
    })
 
  return (
    <main>
      <Header />
      <div className="container p7">
        <h1>Ваше резюме</h1>

        <h3>Контактные данные</h3>
        <Input placeholder="" type="text" label="Имя" size="fieldset-md" onChange={(e) => setName(e.target.value)} value={first_name}/>
        <Input placeholder="" type="text" label="Фамилия" size="fieldset-md" onChange={(e) => setSurname(e.target.value)}  value={last_name}/>
        <Input placeholder="" type="text" label="Мобильный телефон" size="fieldset-md" onChange={(e) => setPhone(e.target.value)}  value={phone}/>
        <AutoCompliteSelect placeholder="" type="text" label="Город проживания" size="fieldset-md" items={cities} onSelect={(data) => setCity(data.id)} selected={cityId}/>


        <h3>Основная информация</h3>

        <SelectDate size="fieldset-sm" label="Дата рождения" onChange={(date) => setBirthday(date)} value={resume.birthday}/>
        <fieldset className={"fieldset fieldset-sm"} >
            <label>Пол</label>

            <div className='radio-group'>
              <div className="radio">

                {resume.gender && resume.gender === "Мужской" && <input  type="radio" onChange={handleGendreChange} name="gender" id="g1" value={"Мужской"} checked/>}
                {!resume.gender || resume.gender !== "Мужской" && <input  type="radio" onChange={handleGendreChange} name="gender" id="g1" value={"Мужской"}/>}
                <label htmlFor="g1">Мужской</label>
              </div>
              <div className="radio">
                {resume.gender && resume.gender === "Женский" && <input  type="radio" onChange={handleGendreChange} name="gender" id="g2" value={"Женский"} checked/>}
                {!resume.gender || resume.gender !== "Женский" && <input  type="radio" onChange={handleGendreChange} name="gender" id="g2" value={"Женский"} />}
                <label htmlFor="g2">Женский</label>
              </div>
            </div>
            
        </fieldset>

        <AutoCompliteSelect placeholder="" type="text" label="Гражданство" size="fieldset-md" items={countries} onSelect={(data) => setCitizenship(data.id)} selected={citizenship}/>

        <h3>Специальность</h3>


        <Input placeholder="" type="text" label="Желаяемая должность" size="fieldset-lg" onChange={(e) => setPosition(e.target.value)} value={position}/>



        <fieldset className={"fieldset fieldset-lg"}>
            <label>Зарплата</label>

            <div className='salary'>
              <input placeholder="" type="number" className='input' value={salary} onChange={e=>setSalary(e.target.value*1)}/>
              <select className='input' value={salary_type} onChange={e=>setSalaryType(e.target.value)}>
                <option value={"KZT"}>KZT</option>
                <option value={"USD"}>USD</option>
                <option value={"RUB"}>RUB</option>
              </select>
              на руки
            </div>
            
        </fieldset>

        <h3>Опыт работы</h3>
        {modalExpIsOpen && <ModalAddExp close={closeModalExp} addWorkingHistory={addWorkingHistory}/>}
        <fieldset className={"fieldset fieldset-lg"}>
            <label>Места работы</label>

            <div className='exp'>
              {workingHistories.map(item => (<WorkingHistory key={item.id} workingHistory={item} remove={removeWorkingHistory}/>))}
              <button className='button button-primary-bordered' onClick={()=> setModalExpIsOpen(true)}>Добавить место работы</button>

            </div>
            
        </fieldset>


        <fieldset className={"fieldset fieldset-lg"}>
            <label>О себе</label>
            <textarea className="textarea" placeholder="Расскажите о себе" onChange={(e)=>setAbout(e.target.value)}  value={about}></textarea>
        </fieldset>

        <AutoCompliteTags placeholder="" type="text" label="Ключевые навыки" size="fieldset-md" items={allSkills} onSelect={onSkillsChange} selected={skills.length > 0 ? skills.split(",").map(item=> ({name: item})) : []}/>

        <h3>Образование</h3>

        <AddEducation onChange={(eds) => setEducation(eds)} education={eds}/>

        <h3>Владение языками</h3>

        <AddLang onChange={(lns) => setForeignLanguages(lns)} foreignLanguages={foreignLanguages}/>

        <h3>Другая важная информация</h3>
        <SelectEmploymentTypes label="Занятость" size="fieldset-md" allEmploymentTypes={allEmploymentTypes} onChange={(tps) => setSelectedEmpTypes(tps)} employmentTypes={employmentTypes}/>

        <button className='button button-primary' onClick={handleSave}>Сохранить и опубликовать</button>
      </div>
    </main>
  )
}

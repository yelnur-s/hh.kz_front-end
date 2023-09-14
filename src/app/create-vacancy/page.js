"use client"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import { useDispatch, useSelector } from "react-redux"
import { getSpecializations, getCities, getExperiences, getSkills, getEmpType, createVacancy } from "@/app/store/slices/vacancySlice"
import ModalSelectSpec from '@/components/ModalSelectSpec'
import AutoCompliteSelect from '@/components/AutoCompliteSelect'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import AutoCompliteTags from "@/components/AutoCompliteTags"
import { useRouter } from "next/navigation"
export default function CreateVacancy() {
    const [name, setName] = useState("")
    const [specializationId, setSpecialization] = useState()
    const [specializationName, setSpecializationName] = useState()
    const [isSpecModalOpen, setSpecModalOpen] = useState(false)
    const [cityId, setCity] = useState()
    const [salary_from, setSalaryFrom] = useState("")
    const [salary_to, setSalaryTo] =useState("")
    const [salary_type, setSalaryType] = useState("KZT")
    const [address, setAddress] = useState()
    const [experienceId, setExperienceId] = useState()
    const [description, setDescription] =useState("<h2>Обязаности</h2> <ul><li></li><li></li></ul><h2>Требования</h2> <ul><li></li><li></li></ul><h2>Условия</h2> <ul><li></li><li></li></ul>")
    const [skills, setSelectedSkills] = useState([])
    const [employmentTypeId, setEmploymentType] = useState()

    const router = useRouter()
    const dispatch = useDispatch()
    const closeSepcModal = () => {
        setSpecModalOpen(false)
    }

    useEffect(() => {
        dispatch(getSpecializations())
        dispatch(getCities())
        dispatch(getExperiences()),
        dispatch(getSkills())
        dispatch(getEmpType())
    }, [])

    const handleOnSpecChange = (e) => {
        setSpecializationName(e.target.dataset.name)
        setSpecialization(e.target.value * 1)
        closeSepcModal()
    }

    const cities = useSelector(state=>state.vacancy.cities)
    const experiences = useSelector(state=>state.vacancy.experiences)
    const allSkills = useSelector(state=>state.vacancy.skills)
    const empTypes = useSelector(state=>state.vacancy.empTypes)

    
    const handleChangeExp = e => {
        setExperienceId(e.target.value)
    }

    const onSkillsChange = (data) => {
        const arr = data.map(item => item.name) 
        setSelectedSkills(arr.join(","))
      }

      const handleSave = () => {
        console.log(specializationId)
        dispatch(createVacancy({
            name,
            specializationId: `${specializationId}`,
            cityId: `${cityId}`,
            description,
            employmentTypeId,
            salary_from: salary_from*1,
            salary_to: salary_to * 1,
            salary_type,
            address,
            experienceId,
            skills,
            about_company: ""
        }, router))
      }
  
    return (
        <main>
            <Header />
            <div className="container p7">
                <h1>Создание вакансии</h1>

                <h2>Основная информация</h2>
                <fieldset className="fieldset-vertical">
                    <label>Название вакансии</label>
                    <input className="input" placeholder="Название" type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                </fieldset>

                <fieldset className="fieldset-vertical">
                    <label>Указать специализацию</label>
                    {specializationName && <p>{specializationName}</p>}
                    <p className="link" onClick={() => setSpecModalOpen(true)}>Указать специализацию</p>
                </fieldset>
                {isSpecModalOpen && <ModalSelectSpec close={closeSepcModal} onChange={handleOnSpecChange} value={specializationId * 1}/>}

                <AutoCompliteSelect placeholder="" type="text" label="Город проживания" size="fieldset-md fieldset-vertical" items={cities} onSelect={(data) => setCity(data.id)}/>

                <fieldset className="fieldset-vertical fieldset-md">
                    <label>Предполагаемый уровень дохода в месяц</label>
                    <div className="input-group">
                        <input className="input" placeholder="От" type="text" value={salary_from} onChange={(e)=>setSalaryFrom(e.target.value)}/>
                        <input className="input" placeholder="До" type="text" value={salary_to} onChange={(e)=>setSalaryTo(e.target.value)}/>
                        <select className="input" name="salary_type" value={salary_type} onChange={e=>setSalaryType(e.target.value)}>
                            <option value={"KZT"}>KZT</option>
                            <option value={"USD"}>USD</option>
                            <option value={"RUB"}>RUB</option>
                        </select>
                    </div>
                    
                </fieldset>

                <fieldset className="fieldset-vertical">
                    <label>Адрес</label>
                    <input className="input" placeholder="Введите адрес" type="text" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                </fieldset>


                <fieldset className="fieldset-vertical fieldset-md">
                    <label>Опыт работы</label>
                    <div>
                        {experiences.map(exp => <div className="radio" key={exp.id}>
                            <input type="radio" value={exp.id} name="exp" onChange={handleChangeExp}/>
                            <label>{exp.duration}</label>
                        </div>)}

                    </div>
                    
                </fieldset>

                <fieldset className="fieldset-vertical fieldset-md">
                    <label>Расскажите про вакансию</label>
                    <div>
                        <CKEditor
                            editor={ ClassicEditor }
                            data={description}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            config={ {
                                toolbar: [ 'bold', 'italic', 'bulletedList', 'numberedList', 'redo' ]
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setDescription(data)
                            } }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                        />
                    </div>
                    
                </fieldset>


                <AutoCompliteTags placeholder="" type="text" label="Ключевые навыки" size="fieldset-md fieldset-vertical" items={allSkills} onSelect={onSkillsChange} selected={skills.length > 0 ? skills.split(",").map(item=> ({name: item})) : []}/>
                
                <fieldset className="fieldset-vertical fieldset-md">
                    <label>Опыт работы</label>
                    <div>
                        {empTypes.map(et => <div className="radio" key={et.id}>
                            <input type="radio" value={et.id} name="exp" onChange={(e) => setEmploymentType(e.target.value)}/>
                            <label>{et.name}</label>
                        </div>)}

                    </div>
                    
                </fieldset>

                <button className="button button-primary" onClick={handleSave}>Создать</button>
            </div>
        </main>
    )
}
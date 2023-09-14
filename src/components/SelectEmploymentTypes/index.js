import { useEffect, useState } from "react"

export default function SelectEmploymentTypes({employmentTypes, label, size, onChange, allEmploymentTypes}) {
    
    // const [eTypes, setETypes] = useState([])

    // useEffect(() => {
    //     setETypes(employmentTypes)
    // }, [employmentTypes])

    const onSelect = (e) => {
        const tps = [...employmentTypes]
        if(e.target.checked && !tps.includes(e.target.value*1)) {
            onChange([...tps, e.target.value * 1])
        } else if(!e.target.checked && tps.includes(e.target.value*1)) {
            const index = tps.indexOf(e.target.value*1);
            tps.splice(index , 1);
            onChange(tps)
        }
    }

    // useEffect(()=> {
    //     onChange(eTypes)
    // }, [eTypes])


    return (
        <fieldset className={"fieldset " + size}>
            <label>{label}</label>
            <div>
                {allEmploymentTypes.map((type, index) => <div className="checkbox" key={index}>
                    {employmentTypes.includes(type.id) && <input type="checkbox" name="employmentTypes" value={type.id} id={type.id + "-type"} onChange={onSelect} checked/>}
                    {!employmentTypes.includes(type.id) && <input type="checkbox" name="employmentTypes" value={type.id} id={type.id + "-type"} onChange={onSelect}/>}
                    
                    <label for={type.id + "-type"}>{type.name}</label>
                </div>)}
            </div>
        </fieldset>
    )
}
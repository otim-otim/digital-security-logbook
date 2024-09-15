import { useState } from "react";
import { IBusiness, ILog } from "../Types";
import { faker } from '@faker-js/faker';
import moment from 'moment'


interface props {
    businesses: IBusiness[]
}
export default function VisitorLogin({ businesses }: props) {

    const [visitor, setVisitor] = useState<ILog>({
        id: 0,
        name: '',
        fingerPrint: '',
        reason: '',
        timeIn: '',
        timeOut: '',
        business: {} as IBusiness
    })

    function login() {
        setVisitor({ 
            // id: 0,
            name: faker.person.fullName(),
            fingerPrint: faker.internet.url(),
            reason: 'visit',
            timeIn: moment().format('YYYY-MM-DD HH:mm:ss'),
            timeOut: '',
            business: {} as IBusiness
                    })
        
    }
    return (
        <div>
            <h1>Visitor Login</h1>
            <div>

            </div>
        </div>
    )
}
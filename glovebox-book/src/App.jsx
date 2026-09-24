import React, { useState } from 'react'
import { useStorage } from './hooks/useStorage'
import { Dashboard } from './components/Dashboard'
import { LogList } from './components/LogList'
import { Reminders } from './components/Reminders'
import { CarInfo } from './components/CarInfo'
import { Modal } from './components/Modal'
import { LogForm } from './components/forms/LogForm'
import { ReminderForm } from './components/forms/ReminderForm'
import { CarForm } from './components/forms/CarForm'
import { toMi, toGal, toUSD } from './utils/units'
import styles from './App.module.css'

const DEFAULT_CARS = [
    { id: 'car1', name: "Red Rocket", make: '', model: '', year: '', plate: '', distUnit: 'mi', volUnit: 'gal', curUnit: 'USD', color: '#99241c' },
    { id: 'car2', name: "Wagon", make: '', model: '', year: '', plate: '', distUnit: 'mi', volUnit: 'gal', curUnit: 'USD', color: '#a6a6a6' },
]

export default function App() {
    const [cars, setCars] = useStorage('cars', DEFAULT_CARS)
    const [logs, setLogs] = useStorage('logs', [])
    const [reminders, setReminders] = useStorage('reminders', [])

    const [activeCar, setActiveCar] = useState(DEFAULT_CARS[0].id)
    const [activeView, setActiveView] = useState('dashboard')
    const [modal, setModal] = useState(null)

    const [logType, setLogType] = useState('fillup')
    const [logForm, setLogForm] = useState({})
    const [reminderForm, setReminderForm] = useState({})
    const [carForm, setCarForm] = useState({})

    const [editingLog, setEditingLog] = useState(null)
    const [editingReminder, setEditingReminder] = useState(null)

    // the currently selected car object
    const car = cars.find(c => c.id === activeCar)

    // all logs for the current car
    const carLogs = logs.filter(l => l.carId === activeCar)

    // all reminders for the current car
    const carReminders = reminders.filter(r => r.carId === activeCar)

    // shorthand for current car's unit preferences
    const du = car?.distUnit || 'mi'
    const vu = car?.volUnit || 'gal'
    const cu = car?.curUnit || 'USD'

    function saveLog() {
        const miStored = logForm.distDisp ? toMi(logForm.distDisp, logForm.distInputUnit || du) : undefined
        const galStored = logForm.volDisp ? toGal(logForm.volDisp, logForm.volInputUnit || vu) : undefined
        const usdStored = logForm.costDisp ? toUSD(logForm.costDisp, logForm.costInputUnit || cu) : undefined

        let mpg = null
        if (logType === 'fillup' && miStored && galStored) {
            const prevFillup = logs
                .filter(l => l.carId === activeCar && l.type === 'fillup' && l.miStored < miStored)
                .sort((a, b) => b.miStored - a.miStored)[0]
            if (prevFillup) {
                const distMi = miStored - prevFillup.miStored
                mpg = distMi / galStored
            }
        }

        const entry = {
            id: editingLog?.id || `log-${Date.now()}`,
            carId: activeCar,
            type: logType,
            date: logForm.date,
            miStored,
            galStored,
            usdStored,
            mpg,
            oilBrand: logForm.oilBrand,
            description: logForm.description,
            shop: logForm.shop,
            hours: logForm.hours,
            station: logForm.station,
            notes: logForm.notes,
        }

        if (editingLog) {
            setLogs(prev => prev.map(l => l.id === editingLog.id ? entry : l))
        } else {
            setLogs(prev => [...prev, entry])
        }

        setModal(null)
        setEditingLog(null)
        setLogForm({})
    }

    function deleteLog(id) {
        setLogs(prev => prev.filter(l => l.id !== id))
    }

    function saveReminder() {
        const entry = {
            id: editingReminder?.id || `rem-${Date.now()}`,
            carId: activeCar,
            name: reminderForm.name,
            intervalMi: reminderForm.intervalMi ? toMi(reminderForm.intervalMi, du) : undefined,
            intervalMonths: reminderForm.intervalMonths ? Number(reminderForm.intervalMonths) : undefined,
            lastMi: reminderForm.lastMi ? toMi(reminderForm.lastMi, du) : undefined,
            lastDate: reminderForm.lastDate,
            notes: reminderForm.notes,
        }

        if (editingReminder) {
            setReminders(prev => prev.map(r => r.id === editingReminder.id ? entry : r))
        } else {
            setReminders(prev => [...prev, entry])
        }

        setModal(null)
        setEditingReminder(null)
        setReminderForm({})
    }

    function deleteReminder(id) {
        setReminders(prev => prev.filter(r => r.id !== id))
    }

    function saveCar() {
        setCars(prev => prev.map(c => c.id === activeCar ? { ...c, ...carForm } : c))
        setModal(null)
        setCarForm({})
    }

    function addCar() {
        const id = `car-${Date.now()}`
        const newCar = {
            id,
            name: 'New Car',
            make: '', model: '', year: '', plate: '',
            distUnit: 'mi', volUnit: 'gal', curUnit: 'USD',
            color: '#16a34a'
        }
        setCars(prev => [...prev, newCar])
        setActiveCar(id)
        setCarForm(newCar)
        setModal('car')
    }

    return (
        <div className={styles.app}>

            {/* Car tabs */}
            <div className={styles.carTabs}>
                {cars.map(c => (
                    <button
                        key={c.id}
                        className={`${styles.carTab} ${activeCar === c.id ? styles.carTabActive : ''}`}
                        onClick={() => {
                            setActiveCar(c.id)
                            setActiveView('dashboard')
                        }}
                    >
                        {c.name}
                    </button>
                ))}
                <button onClick={addCar}>+ Add car</button>
            </div>

            {/* Nav tabs */}
            <div className={styles.navTabs}>
                {['dashboard', 'logs', 'reminders', 'carinfo'].map(v => (
                    <button
                        key={v}
                        className={`${styles.navTab} ${activeView === v ? styles.navTabActive : ''}`}
                        onClick={() => setActiveView(v)}
                    >
                        {v}
                    </button>
                ))}
            </div>

            {/* Views */}
            {activeView === 'dashboard' && (
                <Dashboard
                    car={car}
                    logs={carLogs}
                    reminders={carReminders}
                    du={du}
                    vu={vu}
                    cu={cu}
                    onAddLog={(type) => {
                        setLogType(type)
                        setLogForm({ date: new Date().toISOString().slice(0, 10) })
                        setEditingLog(null)
                        setModal('log')
                    }}
                    onEditLog={(log) => {
                        setLogType(log.type)
                        setLogForm({ ...log })
                        setEditingLog(log)
                        setModal('log')
                    }}
                    onDeleteLog={deleteLog}
                    onAddReminder={() => {
                        setReminderForm({})
                        setEditingReminder(null)
                        setModal('reminder')
                    }}
                    onEditReminder={(r) => {
                        setReminderForm({ ...r })
                        setEditingReminder(r)
                        setModal('reminder')
                    }}
                    onDeleteReminder={deleteReminder}
                />
            )}

            {activeView === 'logs' && (
                <LogList
                    logs={carLogs}
                    du={du}
                    vu={vu}
                    cu={cu}
                    onAdd={() => {
                        setLogType('fillup')
                        setLogForm({ date: new Date().toISOString().slice(0, 10) })
                        setEditingLog(null)
                        setModal('log')
                    }}
                    onEdit={(log) => {
                        setLogType(log.type)
                        setLogForm({ ...log })
                        setEditingLog(log)
                        setModal('log')
                    }}
                    onDelete={deleteLog}
                />
            )}

            {activeView === 'reminders' && (
                <Reminders
                    reminders={carReminders}
                    latestMi={carLogs
                        .filter(l => l.miStored != null)
                        .sort((a, b) => b.miStored - a.miStored)[0]?.miStored}
                    du={du}
                    onAdd={() => {
                        setReminderForm({})
                        setEditingReminder(null)
                        setModal('reminder')
                    }}
                    onEdit={(r) => {
                        setReminderForm({ ...r })
                        setEditingReminder(r)
                        setModal('reminder')
                    }}
                    onDelete={deleteReminder}
                />
            )}

            {activeView === 'carinfo' && (
                <CarInfo
                    car={car}
                    logs={carLogs}
                    onEditCar={() => {
                        setCarForm({ ...car })
                        setModal('car')
                    }}
                />
            )}

            {/* Modals */}
            {modal === 'log' && (
                <Modal
                    title={editingLog ? 'Edit Entry' : 'Add Entry'}
                    onClose={() => setModal(null)}
                >
                    <LogForm
                        logType={logType}
                        onLogTypeChange={setLogType}
                        form={logForm}
                        onFormChange={(field, value) => setLogForm(prev => ({ ...prev, [field]: value }))}
                        onSave={saveLog}
                        onCancel={() => setModal(null)}
                        du={du}
                        vu={vu}
                        cu={cu}
                    />
                </Modal>
            )}

            {modal === 'reminder' && (
                <Modal
                    title={editingReminder ? 'Edit Reminder' : 'Add Reminder'}
                    onClose={() => setModal(null)}
                >
                    <ReminderForm
                        form={reminderForm}
                        onFormChange={(field, value) => setReminderForm(prev => ({ ...prev, [field]: value }))}
                        onSave={saveReminder}
                        onCancel={() => setModal(null)}
                        du={du}
                    />
                </Modal>
            )}

            {modal === 'car' && (
                <Modal
                    title='Car Details'
                    onClose={() => setModal(null)}
                >
                    <CarForm
                        form={carForm}
                        onFormChange={(field, value) => setCarForm(prev => ({ ...prev, [field]: value }))}
                        onSave={saveCar}
                        onCancel={() => setModal(null)}
                    />
                </Modal>
            )}

        </div>
    )
}
export function Modal ({ title, onClose, children}) {
    return (
        <div>
            <div>
                <div>
                    <h2>{title}</h2>
                    <button onClick={onClose}>✕</button>
                </div>
                {children}
            </div>
        </div>
    )
}
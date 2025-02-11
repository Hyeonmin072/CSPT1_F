export default function SelectButton(){
    const handleDesignerSelect = () => {
        navigate("/selectcalendar");
    }

    return (
            onClick={handleDesignerSelect}>
            <Check className="mr-1"/> 선택
        </button>
}
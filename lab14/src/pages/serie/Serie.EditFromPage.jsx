import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent";
import { getAllCategoryService } from "../../services/CategoryService";
import { showSerieService, updateSerieService } from "../../services/SerieServices";

const initData = {
    id: '',
    name: '',
    description: '',
    img: '',   
    category: '',
    file: null, 
};

function SerieEditFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState(initData);

    const loadCategories = async () => {
        const resp = await getAllCategoryService();
        setCategories(resp.data);
    };

    const setDataForm = async () => {
        const resp = await showSerieService(id);
        setData({
            ...resp.data,
            file: null // no hay archivo al inicio
        });
    };

    useEffect(() => {
        loadCategories();
        setDataForm();
    }, []);

    const onChangeNombre = (e) => {
        setData({ ...data, name: e.target.value });
    };

    const onChangeDescripcion = (e) => {
        setData({ ...data, description: e.target.value });
    };

    const onChangeCategoria = (e) => {
        setData({ ...data, category: e.target.value });
    };

    const onChangeFile = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData({
                ...data,
                file: file,
                img: URL.createObjectURL(file)
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('category', data.category);
            if (data.file) {
                formData.append('img', data.file);  // Solo si hay archivo nuevo
            }
            await updateSerieService(data.id, formData);
            navigate('/series');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="border-bottom pb-3 mb-3">
                    <h3>Editar Serie</h3>
                </div>
                <form onSubmit={handleSubmit} className="row" encType="multipart/form-data">
                    <div className="col-md-4">
                        <img
                            className="card-img-top"
                            src={data.img || "https://dummyimage.com/400x250/000/fff&text=Sin+Imagen"}
                            alt="img"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-label">Nombre</label>
                            <input
                                type="text"
                                onChange={onChangeNombre}
                                className="form-control"
                                id="inputName"
                                value={data.name}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputDescription" className="form-label">Descripción</label>
                            <textarea
                                onChange={onChangeDescripcion}
                                className="form-control"
                                id="inputDescription"
                                value={data.description}
                                rows={3}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputCategory" className="form-label">Categoría</label>
                            <select
                                onChange={onChangeCategoria}
                                className="form-select"
                                id="inputCategory"
                                value={data.category}
                                required
                            >
                                <option value="">Seleccione una opción</option>
                                {categories.map((item) => (
                                    <option key={item.id} value={item.id}>{item.description}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputImage" className="form-label">Imagen</label>
                            <input
                                type="file"
                                className="form-control"
                                id="inputImage"
                                accept="image/*"
                                onChange={onChangeFile}
                            />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary me-2">Guardar</button>
                            <Link className="btn btn-secondary" to="/series">Cancelar</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SerieEditFormPage;

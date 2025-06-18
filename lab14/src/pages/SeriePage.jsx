import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import SerieComponent from "../components/SerieComponent";
import { getAllSerieService } from "../services/SerieServices";
import { getAllCategoryService } from "../services/CategoryService";

function SeriePage() {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => {
        const respSeries = await getAllSerieService();
        const respCategories = await getAllCategoryService();
        setCategories(respCategories.data);
        setSeries(respSeries.data);
    };
    loadData();
  }, []);

  const getCategoryDescription = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.description : "Sin categoría";
  };

  return (
    <>
      <HeaderComponent />
      <div className="container mt-3">
        <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
          <h3>Series</h3>
          <Link className="btn btn-primary" to="/series/new">
            Nuevo
          </Link>
        </div>
        <div className="row">
          {series.map((serie) => (
            <div key={serie.id} className="col-md-3 mb-3">
              <SerieComponent
                codigo={serie.id}
                nombre={serie.name}
                description={serie.description}
                categoria={getCategoryDescription(serie.category)}
                imagen={serie.img}
                lista={series}
                actualizaLista={setSeries}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SeriePage;

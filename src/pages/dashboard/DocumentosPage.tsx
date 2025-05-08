import { useNavigate } from "react-router-dom";
import { CustomTable } from "../../components/table/CustomTable";
import { DocumentoDto } from "../../types/documentos";
import { buildTableColumns } from "../../utils/table";
import { useDocumentos } from "./hooks/useDocumentos";
import { CheckCircle, Circle, XCircle } from "lucide-react";
import { FC, useMemo } from "react";
import { useFilterData } from "../../hooks/useFiltered";

const mesMap: { [key: string]: string } = {
  "01": "Enero",
  "02": "Febrero",
  "03": "Marzo",
  "04": "Abril",
  "05": "Mayo",
  "06": "Junio",
  "07": "Julio",
  "08": "Agosto",
  "09": "Septiembre",
  "10": "Octubre",
  "11": "Noviembre",
  "12": "Diciembre",
};

const columns = buildTableColumns<DocumentoDto>((helper) => {
  return [
    helper.accessor("empresa_descripcion", {
      header: "Empresa",
      cell: ({ getValue }) => getValue(),
    }),
    helper.accessor("descripcion_proceso", {
      header: "Descripción del Proceso",
      cell: ({ getValue }) => getValue(),
    }),
    helper.accessor("anio", {
      header: "Año",
      cell: ({ getValue }) => getValue(),
    }),
    helper.accessor("mes", {
      header: "Mes",
      cell: ({ getValue }) => {
        const value = getValue();
        if (value == null || typeof value !== "string") return value;
        return mesMap[value];
      },
    }),
    helper.accessor("item", {
      header: "Semana",
      cell: ({ getValue }) => getValue(),
    }),

    helper.accessor("estado", {
      header: "Estado",
      cell: ({ getValue }) => {
        const estado = getValue();
        let icon, colorClass, label;

        switch (estado) {
          case "published":
            icon = <CheckCircle className="w-5 h-5" />;
            colorClass = "bg-green-500 text-white";
            label = "Pendiente";
            break;
          case "signed":
            icon = <Circle className="w-5 h-5" />;
            colorClass = "bg-blue-500 text-white";
            label = "Firmado";
            break;
          case "canceled":
            icon = <XCircle className="w-5 h-5" />;
            colorClass = "bg-red-500 text-white";
            label = "Cancelado";
            break;
          default:
            icon = null;
            colorClass = "bg-gray-500 text-white";
            label = "-";
        }

        return (
          <div
            className={`max-w-[150px] grid items-center grid-cols-[1fr_3fr] p-2 rounded-lg ${colorClass} dark:bg-opacity-20`}
          >
            <p>{icon}</p>
            <p>{label}</p>
          </div>
        );
      },
    }),
  ];
});

export const DocumentosPage: FC<{ tosign?: boolean }> = ({ tosign }) => {
  const navigate = useNavigate();
  const { documentos, isFetching, error, refresh } = useDocumentos();

  const data = useMemo(() => {
    if (tosign) return documentos.filter((d) => d.estado == "published");
    return documentos;
  }, [tosign, documentos]);

  const [filteredData, setFilter] = useFilterData(data);

  return (
    <div className="p-4 md:p-8">
      <CustomTable
        title="Lista de documentos"
        loading={isFetching}
        error={error}
        onRetry={refresh}
        columns={columns}
        data={filteredData}
        onSearch={setFilter}
        contextMenuAcctions={(row) => [
          {
            label: "Ver Documeto",
            onClick: () => {
              if (row.signed_pdf_name) {
                navigate(`/dashboard/pdf/${row.signed_pdf_name}/${row.estado}`);
                return;
              }
              if (row.nombre_pdf) {
                navigate(`/dashboard/pdf/${row.nombre_pdf}/${row.estado}`);
                return;
              }
            },
          },
        ]}
        onRowDoubleClick={(row) => {
          if (row.signed_pdf_name) {
            navigate(`/dashboard/pdf/${row.signed_pdf_name}/${row.estado}`);
            return;
          }
          if (row.nombre_pdf) {
            navigate(`/dashboard/pdf/${row.nombre_pdf}/${row.estado}`);
            return;
          }
        }}
      />
    </div>
  );
};

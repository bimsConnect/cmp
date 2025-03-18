import { saveAs } from "file-saver"
import ExcelJS from "exceljs"
import { format } from "date-fns"

export async function exportToExcel(
  data: Record<string, string | number>[],
  sheetName: string,
  filename: string
) {
  try {
    // Create workbook and worksheet
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet(sheetName)

    // Add headers
    if (data.length > 0) {
      const headers = Object.keys(data[0])
      worksheet.addRow(headers)
    }

    // Add data rows
    data.forEach(item => {
      worksheet.addRow(Object.values(item))
    })

    // Style the header row
    const headerRow = worksheet.getRow(1)
    headerRow.font = { bold: true }
    headerRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
      }
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    })

    // Auto-fit columns
    worksheet.columns.forEach(column => {
      column.width = 20
    })

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })

    // Save file
    saveAs(blob, `${filename}-${format(new Date(), "yyyy-MM-dd")}.xlsx`)
  } catch (error) {
    console.error("Error exporting to Excel:", error)
  }
}


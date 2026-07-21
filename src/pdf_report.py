from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
import os

def generate_report(dataset_name, rows, columns, target, algorithm):

    os.makedirs("reports", exist_ok=True)

    pdf_path = "reports/report.pdf"

    doc = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    story = []

    story.append(Paragraph("<b>AI BUSINESS INTELLIGENCE REPORT</b>", styles["Title"]))
    story.append(Paragraph(f"<b>Dataset:</b> {dataset_name}", styles["BodyText"]))
    story.append(Paragraph(f"<b>Rows:</b> {rows}", styles["BodyText"]))
    story.append(Paragraph(f"<b>Columns:</b> {columns}", styles["BodyText"]))
    story.append(Paragraph(f"<b>Target:</b> {target}", styles["BodyText"]))
    story.append(Paragraph(f"<b>Best Model:</b> {algorithm}", styles["BodyText"]))

    doc.build(story)

    return pdf_path
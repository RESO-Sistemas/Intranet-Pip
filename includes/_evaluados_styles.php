/* ===== EVALUADOS — DESIGN SYSTEM ===== */

/* Info card header */
.ev-info-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.75rem 1rem;
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 10px;
}
.ev-info-icon {
  width: 36px; height: 36px;
  background: #FEF3C7;
  color: #D97706;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  font-size: 16px;
}
.ev-info-title { font-weight: 700; font-size: 0.95rem; color: #1E293B; }

/* Nota alert */
.ev-nota-alert {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-left: 3px solid #F59E0B;
  border-radius: 8px;
  padding: 0.65rem 1rem;
  font-size: 0.82rem;
  color: #64748B;
}
.ev-nota-alert .material-symbols-outlined { font-size: 16px; color: #F59E0B; flex-shrink: 0; margin-top: 1px; }

/* Offcanvas panel */
.ev-evaluadores-panel { width: min(440px, 95vw); }
.ev-evaluadores-panel .offcanvas-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e9ecef;
  background: #fff;
}
.ev-evaluadores-panel .offcanvas-body {
  padding: 1rem 1.25rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.ev-panel-meta { font-size: 0.72rem; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.5px; }
.ev-panel-title { font-size: 1rem; font-weight: 700; color: #1E293B; margin-top: 2px; }

/* Evaluador mini-cards */
.ev-evaluador-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  margin-bottom: 8px;
  transition: border-color 0.2s;
}
.ev-evaluador-card:hover { border-color: #FDE68A; }
.ev-evaluador-info { display: flex; align-items: center; gap: 10px; min-width: 0; }
.ev-evaluador-avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: #1C1917;
  font-weight: 700;
  font-size: 0.78rem;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.ev-evaluador-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: #1E293B;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
}

/* Badges */
.ev-sbadge {
  display: inline-flex;
  align-items: center;
  padding: 2px 9px;
  border-radius: 20px;
  font-size: 10.5px;
  font-weight: 700;
  margin-top: 3px;
}
.ev-sbadge.amber  { background: #FEF3C7; color: #92400E; }
.ev-sbadge.teal   { background: #F0FDFA; color: #0F766E; }
.ev-sbadge.blue   { background: #EFF6FF; color: #1D4ED8; }
.ev-sbadge.gray   { background: #F1F5F9; color: #64748B; }

/* btn-minimal */
.btn-minimal {
  background: #fff;
  border: 1px solid #e9ecef;
  color: #1a1a2e;
  border-radius: 10px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 14px;
  font-size: 0.875rem;
  cursor: pointer;
  white-space: nowrap;
}
.btn-minimal:hover { border-color: #F59E0B; background: #FFFBEB; color: #1a1a2e; }
.btn-minimal:focus { box-shadow: 0 0 0 0.2rem rgba(245,158,11,0.2); outline: none; }
.btn-minimal.btn-sm { padding: 5px 10px; font-size: 0.8rem; }
.btn-minimal .material-symbols-outlined { font-size: 17px; line-height: 1; }

/* btn-minimal-danger */
.btn-minimal-danger {
  background: #fff;
  border: 1px solid #f1aeb5;
  color: #b02a37;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  cursor: pointer;
  flex-shrink: 0;
}
.btn-minimal-danger:hover { border-color: #dc3545; box-shadow: 0 2px 8px rgba(220,53,69,0.18); }
.btn-minimal-danger .material-symbols-outlined { font-size: 15px; line-height: 1; }
.btn-minimal-danger:disabled { opacity: 0.4; cursor: default; pointer-events: none; }

/* btn-ghost */
.btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: transparent;
  border: 1px dashed #adb5bd;
  color: #6c757d;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}
.btn-ghost:hover { border-color: #F59E0B; color: #1a1a2e; background: #FFFBEB; }

/* Modal nuevo evaluador */
.ev-modal-header-styled {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #F1F5F9;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ev-modal-title-styled {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  color: #1E293B;
}
.ev-modal-icon {
  width: 34px; height: 34px;
  border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}
.ev-modal-icon.teal { background: #F0FDFA; color: #0F766E; }

/* Filter section inside modal */
.ev-filter-section {
  background: #FAFBFF;
  border-bottom: 1px solid #F1F5F9;
  padding: 0.9rem 1.25rem;
}
.ev-filter-label {
  font-size: 10.5px;
  font-weight: 700;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  margin-bottom: 0.65rem;
  display: flex;
  align-items: center;
  gap: 6px;
}
.ev-filter-label::after { content: ''; flex: 1; height: 1px; background: #E2E8F0; }
.ev-filter-label .material-symbols-outlined { font-size: 13px; }
.ev-modal-form-label { font-size: 11.5px; font-weight: 600; color: #374151; margin-bottom: 3px; display: block; }

/* ===== CARDS DE EVALUADOS (reemplaza EJ Grid) ===== */
.ev-evaluado-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  margin-bottom: 8px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.ev-evaluado-card:hover {
  border-color: #FDE68A;
  box-shadow: 0 2px 10px rgba(245,158,11,0.08);
}
.ev-evaluado-avatar-lg {
  width: 46px; height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: #1C1917;
  font-weight: 800;
  font-size: 0.9rem;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  letter-spacing: 0.5px;
}
.ev-evaluado-body { flex: 1; min-width: 0; }
.ev-evaluado-nombre {
  font-weight: 700;
  font-size: 0.92rem;
  color: #1E293B;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ev-evaluado-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 3px;
  flex-wrap: wrap;
}
.ev-evaluado-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.78rem;
  color: #64748B;
}
.ev-evaluado-meta-item .material-symbols-outlined { font-size: 14px; }
.ev-evaluado-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

/* Buscador evaluados */
.ev-search-wrap { margin-bottom: 12px; }
.ev-search-wrap .input-group-text { background: #fff; border-right: none; }
.ev-search-wrap .form-control { border-left: none; font-size: 0.875rem; }
.ev-search-wrap .form-control:focus { box-shadow: none; border-color: #F59E0B; }
.ev-search-wrap .form-control:focus + * { border-color: #F59E0B; }

/* Empty state */
.ev-empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #94A3B8;
}
.ev-empty-state .material-symbols-outlined { font-size: 48px; margin-bottom: 8px; }
.ev-empty-state p { font-size: 0.875rem; margin: 0; }

/* Scrollbar en lista de posibles evaluadores */
#ev-posibles-evaluadores-list::-webkit-scrollbar { width: 5px; }
#ev-posibles-evaluadores-list::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 3px; }
#ev-posibles-evaluadores-list::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 3px; }
#ev-posibles-evaluadores-list::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }

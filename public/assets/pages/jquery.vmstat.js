$(document).ready(function() {
    if($('#key-table').length)
        $('#key-table').DataTable({
            keys: true
        });
    if($('#key-table-org').length)
        $('#key-table-org').DataTable({
            keys: true
        });
    if($('#key-table-vdc').length)
        $('#key-table-vdc').DataTable({
            keys: true
        });
});

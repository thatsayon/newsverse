from rest_framework.permissions import BasePermission

class IsSelectedUser(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False 
        selected_user = ['ashiqulislamayon28@gmail.com']
        return request.user.email in selected_user
    

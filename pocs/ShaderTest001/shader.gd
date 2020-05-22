tool
extends Sprite


# Declare member variables here. Examples:
# var a = 2
# var b = "text"


# Called when the node enters the scene tree for the first time.
func _ready():
	material.set_shader_param("size", get_rect().size)


# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta):
#	pass


func _on_texture_item_rect_changed():
	material.set_shader_param("scale", scale)
	material.set_shader_param("size", get_rect().size)

{
    "targets": [
        {
            "target_name": "netlink_binding",
            "sources": [ "src/binding.cc" ],
            "include_dirs" : [
 	 			"<!(node -e \"require('nan')\")"
			]
        }
    ],
}
